// Permission Requirements for Navigation Items
// Maps each navigation route to the required permissions

export enum Permission {
    // All resources wildcard
    ALL = '*',

    // Tenant
    TENANT_READ = 'tenant:read',
    TENANT_UPDATE = 'tenant:update',
    TENANT_ALL = 'tenant:*',

    // Organization
    ORGANIZATION_READ = 'organization:read',
    ORGANIZATION_CREATE = 'organization:create',
    ORGANIZATION_UPDATE = 'organization:update',
    ORGANIZATION_DELETE = 'organization:delete',
    ORGANIZATION_ALL = 'organization:*',

    // Branch
    BRANCH_READ = 'branch:read',
    BRANCH_CREATE = 'branch:create',
    BRANCH_UPDATE = 'branch:update',
    BRANCH_DELETE = 'branch:delete',
    BRANCH_ALL = 'branch:*',

    // Department
    DEPARTMENT_READ = 'department:read',
    DEPARTMENT_CREATE = 'department:create',
    DEPARTMENT_UPDATE = 'department:update',
    DEPARTMENT_DELETE = 'department:delete',
    DEPARTMENT_ALL = 'department:*',

    // Category
    CATEGORY_READ = 'category:read',
    CATEGORY_CREATE = 'category:create',
    CATEGORY_UPDATE = 'category:update',
    CATEGORY_DELETE = 'category:delete',
    CATEGORY_ALL = 'category:*',

    // User Management
    USER_READ = 'user:read',
    USER_CREATE = 'user:create',
    USER_UPDATE = 'user:update',
    USER_DELETE = 'user:delete',
    USER_ALL = 'user:*',

    // Staff
    STAFF_READ = 'staff:read',
    STAFF_CREATE = 'staff:create',
    STAFF_UPDATE = 'staff:update',
    STAFF_DELETE = 'staff:delete',
    STAFF_ALL = 'staff:*',

    // Student
    STUDENT_READ = 'student:read',
    STUDENT_CREATE = 'student:create',
    STUDENT_UPDATE = 'student:update',
    STUDENT_DELETE = 'student:delete',
    STUDENT_ALL = 'student:*',

    // Academic Year
    ACADEMIC_YEAR_READ = 'academic-year:read',
    ACADEMIC_YEAR_CREATE = 'academic-year:create',
    ACADEMIC_YEAR_UPDATE = 'academic-year:update',
    ACADEMIC_YEAR_DELETE = 'academic-year:delete',
    ACADEMIC_YEAR_ALL = 'academic-year:*',

    // Course
    COURSE_READ = 'course:read',
    COURSE_CREATE = 'course:create',
    COURSE_UPDATE = 'course:update',
    COURSE_DELETE = 'course:delete',
    COURSE_ALL = 'course:*',

    // Subject
    SUBJECT_READ = 'subject:read',
    SUBJECT_CREATE = 'subject:create',
    SUBJECT_UPDATE = 'subject:update',
    SUBJECT_DELETE = 'subject:delete',
    SUBJECT_ALL = 'subject:*',

    // Class
    CLASS_READ = 'class:read',
    CLASS_CREATE = 'class:create',
    CLASS_UPDATE = 'class:update',
    CLASS_DELETE = 'class:delete',
    CLASS_ALL = 'class:*',

    // Attendance
    ATTENDANCE_READ = 'attendance:read',
    ATTENDANCE_CREATE = 'attendance:create',
    ATTENDANCE_UPDATE = 'attendance:update',
    ATTENDANCE_DELETE = 'attendance:delete',
    ATTENDANCE_ALL = 'attendance:*',

    // Exam
    EXAM_READ = 'exam:read',
    EXAM_CREATE = 'exam:create',
    EXAM_UPDATE = 'exam:update',
    EXAM_DELETE = 'exam:delete',
    EXAM_ALL = 'exam:*',

    // Exam Marks
    EXAM_MARKS_READ = 'exam-marks:read',
    EXAM_MARKS_CREATE = 'exam-marks:create',
    EXAM_MARKS_UPDATE = 'exam-marks:update',
    EXAM_MARKS_DELETE = 'exam-marks:delete',
    EXAM_MARKS_ALL = 'exam-marks:*',

    // Timetable
    TIMETABLE_READ = 'timetable:read',
    TIMETABLE_CREATE = 'timetable:create',
    TIMETABLE_UPDATE = 'timetable:update',
    TIMETABLE_DELETE = 'timetable:delete',
    TIMETABLE_ALL = 'timetable:*',

    // Inventory
    INVENTORY_READ = 'inventory:read',
    INVENTORY_CREATE = 'inventory:create',
    INVENTORY_UPDATE = 'inventory:update',
    INVENTORY_DELETE = 'inventory:delete',
    INVENTORY_ALL = 'inventory:*',

    // Reports
    REPORTS_READ = 'reports:read',
    REPORTS_ALL = 'reports:*',

    // Analytics
    ANALYTICS_READ = 'analytics:read',

    // Profile
    PROFILE_READ = 'profile:read',
    PROFILE_UPDATE = 'profile:update',

    // Assignment
    ASSIGNMENT_READ = 'assignment:read',
    ASSIGNMENT_CREATE = 'assignment:create',
    ASSIGNMENT_UPDATE = 'assignment:update',
    ASSIGNMENT_DELETE = 'assignment:delete',
    ASSIGNMENT_SUBMIT = 'assignment:submit',
    ASSIGNMENT_ALL = 'assignment:*',

    // Grade
    GRADE_READ = 'grade:read',
    GRADE_CREATE = 'grade:create',
    GRADE_UPDATE = 'grade:update',
    GRADE_DELETE = 'grade:delete',
    GRADE_ALL = 'grade:*',

    // Section
    SECTION_READ = 'section:read',
    SECTION_CREATE = 'section:create',
    SECTION_UPDATE = 'section:update',
    SECTION_DELETE = 'section:delete',
    SECTION_ALL = 'section:*',

    // Subject Allocation
    SUBJECT_ALLOCATION_READ = 'subject-allocation:read',
    SUBJECT_ALLOCATION_CREATE = 'subject-allocation:create',
    SUBJECT_ALLOCATION_UPDATE = 'subject-allocation:update',
    SUBJECT_ALLOCATION_DELETE = 'subject-allocation:delete',
    SUBJECT_ALLOCATION_ALL = 'subject-allocation:*',
}

// Define permission requirements for each route
export const RoutePermissions: Record<string, Permission[]> = {
    // Dashboard - everyone can access
    '/dashboard': [],

    // Structure section
    '/structure-overview': [Permission.ORGANIZATION_READ, Permission.BRANCH_READ], // Need read access to see structure
    '/tenants': [Permission.TENANT_READ, Permission.TENANT_ALL],
    '/organizations': [Permission.ORGANIZATION_READ, Permission.ORGANIZATION_ALL],
    '/branches': [Permission.BRANCH_READ, Permission.BRANCH_ALL],
    '/departments': [Permission.DEPARTMENT_READ, Permission.DEPARTMENT_ALL],
    '/categories': [Permission.CATEGORY_READ, Permission.CATEGORY_ALL],

    // People section
    '/people-overview': [Permission.USER_READ, Permission.STAFF_READ, Permission.STUDENT_READ],
    '/users': [Permission.USER_READ, Permission.USER_ALL],
    '/staff': [Permission.STAFF_READ, Permission.STAFF_ALL],
    '/students': [Permission.STUDENT_READ, Permission.STUDENT_ALL],

    // Academics section
    '/academics-overview': [Permission.COURSE_READ, Permission.CLASS_READ],
    '/academic-years': [Permission.ACADEMIC_YEAR_READ, Permission.ACADEMIC_YEAR_ALL],
    '/courses': [Permission.COURSE_READ, Permission.COURSE_ALL],
    '/subjects': [Permission.SUBJECT_READ, Permission.SUBJECT_ALL],
    '/classes': [Permission.CLASS_READ, Permission.CLASS_ALL],

    // Operations section
    '/operations-overview': [Permission.ATTENDANCE_READ, Permission.EXAM_READ],
    '/attendance': [Permission.ATTENDANCE_READ, Permission.ATTENDANCE_ALL],
    '/exams': [Permission.EXAM_READ, Permission.EXAM_ALL],
    '/timetable': [Permission.TIMETABLE_READ, Permission.TIMETABLE_ALL],
    '/inventory': [Permission.INVENTORY_READ, Permission.INVENTORY_ALL],
};
