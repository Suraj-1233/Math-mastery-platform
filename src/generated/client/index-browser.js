
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.19.1
 * Query Engine version: 69d742ee20b815d88e17e54db4a2a7a3b30324e3
 */
Prisma.prismaVersion = {
  client: "5.19.1",
  engine: "69d742ee20b815d88e17e54db4a2a7a3b30324e3"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  subscriptionStatus: 'subscriptionStatus',
  needsPasswordChange: 'needsPasswordChange',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt'
};

exports.Prisma.OrgMembershipScalarFieldEnum = {
  id: 'id',
  role: 'role',
  userId: 'userId',
  organizationId: 'organizationId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  type: 'type',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  logoUrl: 'logoUrl',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  plan: 'plan',
  maxSeats: 'maxSeats',
  status: 'status',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BatchScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  organizationId: 'organizationId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  icon: 'icon',
  type: 'type',
  awardedAt: 'awardedAt',
  userId: 'userId'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  text: 'text',
  textHi: 'textHi',
  options: 'options',
  correctOptionIndex: 'correctOptionIndex',
  explanation: 'explanation',
  explanationHi: 'explanationHi',
  subject: 'subject',
  topic: 'topic',
  difficulty: 'difficulty',
  examType: 'examType',
  year: 'year',
  imageUrl: 'imageUrl',
  imageWidth: 'imageWidth',
  imageHeight: 'imageHeight',
  tags: 'tags',
  isPremium: 'isPremium',
  questionType: 'questionType',
  metadata: 'metadata',
  solveAttemptCount: 'solveAttemptCount',
  wrongAttemptCount: 'wrongAttemptCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  organizationId: 'organizationId',
  createdById: 'createdById',
  isPublic: 'isPublic',
  category: 'category'
};

exports.Prisma.TestScalarFieldEnum = {
  id: 'id',
  title: 'title',
  titleHi: 'titleHi',
  description: 'description',
  descriptionHi: 'descriptionHi',
  type: 'type',
  topicId: 'topicId',
  duration: 'duration',
  questionCount: 'questionCount',
  difficulty: 'difficulty',
  totalMarks: 'totalMarks',
  negativeMarking: 'negativeMarking',
  organizationId: 'organizationId',
  createdById: 'createdById',
  status: 'status',
  scheduledAt: 'scheduledAt',
  isPublic: 'isPublic',
  resultsDisclosed: 'resultsDisclosed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuestionOccurrenceScalarFieldEnum = {
  id: 'id',
  examName: 'examName',
  year: 'year',
  shift: 'shift',
  questionId: 'questionId',
  createdAt: 'createdAt'
};

exports.Prisma.MediaScalarFieldEnum = {
  id: 'id',
  url: 'url',
  type: 'type',
  width: 'width',
  height: 'height',
  caption: 'caption',
  questionId: 'questionId',
  createdAt: 'createdAt'
};

exports.Prisma.UserProgressScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  questionId: 'questionId',
  status: 'status',
  isSolved: 'isSolved',
  isCorrect: 'isCorrect',
  isBookmarked: 'isBookmarked',
  attemptedAt: 'attemptedAt',
  timeTaken: 'timeTaken'
};

exports.Prisma.UserTestAttemptScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  testId: 'testId',
  score: 'score',
  accuracy: 'accuracy',
  rank: 'rank',
  answersJson: 'answersJson',
  status: 'status',
  startedAt: 'startedAt',
  updatedAt: 'updatedAt',
  completedAt: 'completedAt',
  organizationId: 'organizationId'
};

exports.Prisma.TestAssignmentScalarFieldEnum = {
  id: 'id',
  testId: 'testId',
  studentId: 'studentId',
  organizationId: 'organizationId',
  assignedAt: 'assignedAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires',
  createdAt: 'createdAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires',
  createdAt: 'createdAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  OrgMembership: 'OrgMembership',
  Notification: 'Notification',
  Organization: 'Organization',
  Batch: 'Batch',
  Badge: 'Badge',
  Question: 'Question',
  Test: 'Test',
  QuestionOccurrence: 'QuestionOccurrence',
  Media: 'Media',
  UserProgress: 'UserProgress',
  UserTestAttempt: 'UserTestAttempt',
  TestAssignment: 'TestAssignment',
  PasswordResetToken: 'PasswordResetToken',
  VerificationToken: 'VerificationToken',
  Account: 'Account',
  Session: 'Session'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
