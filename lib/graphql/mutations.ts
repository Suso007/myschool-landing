// GraphQL Mutations - School Management System
import { gql } from '@apollo/client';

// ============================================
// AUTH MUTATIONS
// ============================================

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        role
        tenantId
        isActive
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        role
        tenantId
        isActive
      }
    }
  }
`;

// ============================================
// TENANT MUTATIONS
// ============================================

export const ADD_TENANT = gql`
  mutation AddTenant($input: TenantInput!) {
    addTenant(input: $input) {
      id
      name
      domainSlug
      subscriptionPlan
      isActive
    }
  }
`;

export const UPDATE_TENANT = gql`
  mutation UpdateTenant($id: ID!, $input: UpdateTenantInput!) {
    updateTenant(id: $id, input: $input) {
      id
      name
      domainSlug
      subscriptionPlan
      isActive
    }
  }
`;

export const DELETE_TENANT = gql`
  mutation DeleteTenant($id: ID!) {
    deleteTenant(id: $id)
  }
`;

// ============================================
// ORGANIZATION MUTATIONS
// ============================================

export const ADD_ORGANIZATION = gql`
  mutation AddOrganization($input: OrganizationInput!) {
    addOrganization(input: $input) {
      id
      tenantId
      name
      region
      headOfOrg
      isActive
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($id: ID!, $input: UpdateOrganizationInput!) {
    updateOrganization(id: $id, input: $input) {
      id
      tenantId
      name
      region
      headOfOrg
      isActive
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: ID!) {
    deleteOrganization(id: $id)
  }
`;

// ============================================
// BRANCH MUTATIONS
// ============================================

export const ADD_BRANCH = gql`
  mutation AddBranch($input: BranchInput!) {
    addBranch(input: $input) {
      id
      organizationId
      tenantId
      name
      city
      state
      isActive
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch($id: ID!, $input: UpdateBranchInput!) {
    updateBranch(id: $id, input: $input) {
      id
      organizationId
      tenantId
      name
      city
      state
      isActive
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation DeleteBranch($id: ID!) {
    deleteBranch(id: $id)
  }
`;

// ============================================
// DEPARTMENT MUTATIONS
// ============================================

export const ADD_DEPARTMENT = gql`
  mutation AddDepartment($input: DepartmentInput!) {
    addDepartment(input: $input) {
      id
      branchId
      name
      code
      hodName
      isActive
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      branchId
      name
      code
      hodName
      isActive
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id)
  }
`;

// ============================================
// CATEGORY MUTATIONS
// ============================================

export const ADD_CATEGORY = gql`
  mutation AddCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      id
      departmentId
      name
      description
      type
      isActive
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      departmentId
      name
      description
      type
      isActive
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// ============================================
// STAFF MUTATIONS
// ============================================

export const ADD_STAFF_PROFILE = gql`
  mutation AddStaffProfile($input: StaffProfileInput!) {
    addStaffProfile(input: $input) {
      id
      firstName
      lastName
      employeeCode
      designation
      isActive
    }
  }
`;

export const UPDATE_STAFF_PROFILE = gql`
  mutation UpdateStaffProfile($id: ID!, $input: UpdateStaffProfileInput!) {
    updateStaffProfile(id: $id, input: $input) {
      id
      firstName
      lastName
      employeeCode
      designation
      isActive
    }
  }
`;

export const DELETE_STAFF_PROFILE = gql`
  mutation DeleteStaffProfile($id: ID!) {
    deleteStaffProfile(id: $id)
  }
`;

// ============================================
// STUDENT MUTATIONS
// ============================================

export const ADD_STUDENT = gql`
  mutation AddStudent($input: StudentInput!) {
    addStudent(input: $input) {
      id
      firstName
      lastName
      admissionNo
      rollNo
      isActive
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
    updateStudent(id: $id, input: $input) {
      id
      firstName
      lastName
      admissionNo
      rollNo
      isActive
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;

// ============================================
// ACADEMIC YEAR MUTATIONS
// ============================================

export const ADD_ACADEMIC_YEAR = gql`
  mutation AddAcademicYear($input: AcademicYearInput!) {
    addAcademicYear(input: $input) {
      id
      branchId
      name
      startDate
      endDate
      isCurrent
    }
  }
`;

export const UPDATE_ACADEMIC_YEAR = gql`
  mutation UpdateAcademicYear($id: ID!, $input: UpdateAcademicYearInput!) {
    updateAcademicYear(id: $id, input: $input) {
      id
      branchId
      name
      startDate
      endDate
      isCurrent
    }
  }
`;

export const DELETE_ACADEMIC_YEAR = gql`
  mutation DeleteAcademicYear($id: ID!) {
    deleteAcademicYear(id: $id)
  }
`;

// ============================================
// COURSE MUTATIONS
// ============================================

export const ADD_COURSE = gql`
  mutation AddCourse($input: CourseInput!) {
    addCourse(input: $input) {
      id
      departmentId
      name
      code
      duration
      isActive
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $input: UpdateCourseInput!) {
    updateCourse(id: $id, input: $input) {
      id
      departmentId
      name
      code
      duration
      isActive
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

// ============================================
// SUBJECT MUTATIONS
// ============================================

export const ADD_SUBJECT = gql`
  mutation AddSubject($input: SubjectInput!) {
    addSubject(input: $input) {
      id
      departmentId
      name
      code
      credits
      isActive
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: ID!, $input: UpdateSubjectInput!) {
    updateSubject(id: $id, input: $input) {
      id
      departmentId
      name
      code
      credits
      isActive
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: ID!) {
    deleteSubject(id: $id)
  }
`;

// ============================================
// CLASS MUTATIONS
// ============================================

export const ADD_CLASS = gql`
  mutation AddClass($input: ClassInput!) {
    addClass(input: $input) {
      id
      branchId
      academicYearId
      courseId
      name
      section
      roomNo
      isActive
    }
  }
`;

export const UPDATE_CLASS = gql`
  mutation UpdateClass($id: ID!, $input: UpdateClassInput!) {
    updateClass(id: $id, input: $input) {
      id
      branchId
      academicYearId
      courseId
      name
      section
      roomNo
      isActive
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation DeleteClass($id: ID!) {
    deleteClass(id: $id)
  }
`;

// ============================================
// USER MANAGEMENT MUTATIONS
// ============================================

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      phone
      role
      tenantId
      organizationId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      isActive
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      phone
      role
      tenantId
      organizationId
      branchId
      departmentId
      firstName
      lastName
      profilePicture
      isActive
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// ============================================
// TIMETABLE MUTATIONS
// ============================================

export const ADD_TIMETABLE_SLOT = gql`
  mutation AddTimetableSlot($input: TimetableSlotInput!) {
    addTimetableSlot(input: $input) {
      id
      branchId
      classId
      subjectId
      staffId
      dayOfWeek
      startTime
      endTime
      roomNo
      isActive
    }
  }
`;

export const UPDATE_TIMETABLE_SLOT = gql`
  mutation UpdateTimetableSlot($id: ID!, $input: UpdateTimetableSlotInput!) {
    updateTimetableSlot(id: $id, input: $input) {
      id
      branchId
      classId
      subjectId
      staffId
      dayOfWeek
      startTime
      endTime
      roomNo
      isActive
    }
  }
`;

export const DELETE_TIMETABLE_SLOT = gql`
  mutation DeleteTimetableSlot($id: ID!) {
    deleteTimetableSlot(id: $id)
  }
`;

export const BULK_CREATE_SLOTS = gql`
  mutation BulkCreateTimeableSlots($input: BulkTimetableSlotInput!) {
    bulkCreateTimetableSlots(input: $input) {
      id
      branchId
      classId
      subjectId
      staffId
      dayOfWeek
      startTime
      endTime
      roomNo
      isActive
    }
  }
`;

// ============================================
// SUBSTITUTION MUTATIONS
// ============================================

export const REQUEST_SUBSTITUTION = gql`
  mutation RequestSubstitution($input: SubstitutionInput!) {
    requestSubstitution(input: $input) {
      id
      timetableSlotId
      originalStaffId
      substituteStaffId
      date
      reason
      status
      createdAt
    }
  }
`;

export const UPDATE_SUBSTITUTION = gql`
  mutation UpdateSubstitution($id: ID!, $input: UpdateSubstitutionInput!) {
    updateSubstitution(id: $id, input: $input) {
      id
      timetableSlotId
      originalStaffId
      substituteStaffId
      date
      reason
      status
      updatedAt
    }
  }
`;

export const APPROVE_SUBSTITUTION = gql`
  mutation ApproveSubstitution($id: ID!) {
    approveSubstitution(id: $id) {
      id
      status
      updatedAt
    }
  }
`;

export const REJECT_SUBSTITUTION = gql`
  mutation RejectSubstitution($id: ID!, $reason: String) {
    rejectSubstitution(id: $id, reason: $reason) {
      id
      status
      reason
      updatedAt
    }
  }
`;

export const DELETE_SUBSTITUTION = gql`
  mutation DeleteSubstitution($id: ID!) {
    deleteSubstitution(id: $id)
  }
`;
