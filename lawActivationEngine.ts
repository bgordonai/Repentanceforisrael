
import { Mitzvah, UserLawContext, LawStatus, LawSeverity, ActivationMode } from '../types';

export interface DashboardProtocol {
  primaryLaw: Mitzvah;
  supportingLaws: Mitzvah[];
  trainingCount: number;
  dormantCount: number;
}

/**
 * LAW ACTIVATION ENGINE — CORE LOGIC
 * This runs to determine which laws are active for a user today.
 */
export const getDailyLawProtocol = (
  userContext: UserLawContext,
  allLaws: Mitzvah[]
): DashboardProtocol => {
  const candidates: { law: Mitzvah; status: LawStatus }[] = [];

  for (const law of allLaws) {
    // 1. Basic Filters
    if (userContext.age < law.minAge || userContext.age > law.maxAge) continue;
    
    const sexMatch = law.applicableSex === 'Both' || law.applicableSex === userContext.sex;
    if (!sexMatch) continue;

    const tribeMatch = law.primaryTribe === 'All' || law.primaryTribe.includes(userContext.tribe);
    
    // 2. Logic for Land/Temple (STEP 3 of spec)
    if (law.landRequired && userContext.location !== 'land') {
      candidates.push({ law, status: LawStatus.DORMANT });
      continue;
    }

    if (law.templeRequired) {
      candidates.push({ law, status: LawStatus.TRAINING });
      continue;
    }

    // 3. Activation Mode Logic
    if (law.activationMode === ActivationMode.CALENDAR_BASED) {
      // In a real app, we check if current_date is in feast_window
      // For this implementation, we check if userContext.currentFeast matches
      const isFeastActive = userContext.currentFeast !== 'None';
      if (isFeastActive) {
        candidates.push({ law, status: LawStatus.ACTIVE });
      } else {
        candidates.push({ law, status: LawStatus.INACTIVE });
      }
      continue;
    }

    if (law.activationMode === ActivationMode.CONDITIONAL) {
       // Mock condition check: higher scores unlock more conditional laws
       if (userContext.age > 30) {
         candidates.push({ law, status: LawStatus.ACTIVE });
       } else {
         candidates.push({ law, status: LawStatus.INACTIVE });
       }
       continue;
    }

    if (law.activationMode === ActivationMode.DORMANT) {
      candidates.push({ law, status: LawStatus.DORMANT });
      continue;
    }

    // Default to ACTIVE for tribe-matched "Always" laws
    if (tribeMatch) {
      candidates.push({ law, status: LawStatus.ACTIVE });
    } else {
      candidates.push({ law, status: LawStatus.INACTIVE });
    }
  }

  // 4. Prioritize (STEP 4 of spec)
  // priority_order: 1. Calendar-triggered ACTIVE laws, 2. Severity = judgment, 3. Authority = individual
  const activeLaws = candidates
    .filter(c => c.status === LawStatus.ACTIVE)
    .map(c => c.law)
    .sort((a, b) => {
      // Calendar based first
      if (a.activationMode === ActivationMode.CALENDAR_BASED && b.activationMode !== ActivationMode.CALENDAR_BASED) return -1;
      if (b.activationMode === ActivationMode.CALENDAR_BASED && a.activationMode !== ActivationMode.CALENDAR_BASED) return 1;

      // Severity next
      const severityOrder = { [LawSeverity.JUDGMENT]: 0, [LawSeverity.COMMAND]: 1, [LawSeverity.INSTRUCTION]: 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }

      // Smallest ID as tie-break
      return a.id - b.id;
    });

  const trainingCount = candidates.filter(c => c.status === LawStatus.TRAINING).length;
  const dormantCount = candidates.filter(c => c.status === LawStatus.DORMANT).length;

  // Output to Dashboard (CONTROLLED)
  // Surface only 1 primary focus and a couple of supporting laws
  const primaryLaw = activeLaws[0] || allLaws[0]; // fallback to first law
  const supportingLaws = activeLaws.slice(1, 4);

  return {
    primaryLaw,
    supportingLaws,
    trainingCount,
    dormantCount
  };
};
