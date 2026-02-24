export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    ORG_OWNER: 'ORG_OWNER',
    TEACHER: 'TEACHER',
} as const;

export type UserRole = keyof typeof ROLES;

export const CONTENT_CATEGORY = {
    PRACTICE: 'PRACTICE',
    TEST: 'TEST',
    BOTH: 'BOTH',
} as const;

export const TEST_STATUS = {
    DRAFT: 'DRAFT',
    LIVE: 'LIVE',
    ARCHIVED: 'ARCHIVED',
} as const;

export const ATTEMPT_STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    SUBMITTED: 'SUBMITTED',
} as const;
