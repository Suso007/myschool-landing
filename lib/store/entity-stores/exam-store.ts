// Exam Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import {
    GET_QUESTIONS,
    GET_QUESTION,
    GET_QUESTION_CATEGORIES,
    GET_ASSESSMENTS,
    GET_ASSESSMENT,
    GET_STUDENT_ASSESSMENT_ATTEMPT,
    GET_GRADE_SCALES,
    GET_REPORT_CARDS,
} from '../../graphql/queries';
import {
    ADD_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    ADD_QUESTION_CATEGORY,
    CREATE_ASSESSMENT,
    UPDATE_ASSESSMENT,
    PUBLISH_ASSESSMENT,
    ADD_QUESTIONS_TO_ASSESSMENT,
    GRADE_ANSWER,
    ADD_GRADE_SCALE,
    UPDATE_GRADE_SCALE,
    GENERATE_REPORT_CARD,
    PUBLISH_REPORT_CARD,
} from '../../graphql/mutations';
import {
    Question,
    QuestionInput,
    UpdateQuestionInput,
    QuestionCategory,
    QuestionCategoryInput,
    Assessment,
    AssessmentInput,
    UpdateAssessmentInput,
    AssessmentQuestionInput,
    StudentAssessmentAttempt,
    GradeAnswerInput,
    GradeScale,
    GradeScaleInput,
    UpdateGradeScaleInput,
    ReportCard,
    ReportCardInput,
} from '../../types';

interface ExamState {
    // Questions
    questions: Question[];
    selectedQuestion: Question | null;
    questionCategories: QuestionCategory[];

    // Assessments
    assessments: Assessment[];
    selectedAssessment: Assessment | null;

    // Attempts
    attempts: StudentAssessmentAttempt[];
    selectedAttempt: StudentAssessmentAttempt | null;

    // Grade Scales
    gradeScales: GradeScale[];

    // Report Cards
    reportCards: ReportCard[];

    // State
    loading: boolean;
    error: string | null;

    // Question Actions
    fetchQuestions: (filters?: {
        branchId?: number;
        subjectId?: number;
        categoryId?: number;
        questionType?: string;
        difficultyLevel?: string;
        skip?: number;
        take?: number;
    }) => Promise<void>;
    fetchQuestion: (id: string) => Promise<void>;
    fetchQuestionCategories: (branchId?: number, subjectId?: number) => Promise<void>;
    addQuestion: (input: QuestionInput) => Promise<Question | null>;
    updateQuestion: (id: string, input: UpdateQuestionInput) => Promise<Question | null>;
    deleteQuestion: (id: string) => Promise<boolean>;
    addQuestionCategory: (input: QuestionCategoryInput) => Promise<QuestionCategory | null>;

    // Assessment Actions
    fetchAssessments: (filters?: {
        branchId?: number;
        academicYearId?: number;
        subjectId?: number;
        classId?: number;
        assessmentType?: string;
        skip?: number;
        take?: number;
    }) => Promise<void>;
    fetchAssessment: (id: string) => Promise<void>;
    createAssessment: (input: AssessmentInput) => Promise<Assessment | null>;
    updateAssessment: (id: string, input: UpdateAssessmentInput) => Promise<Assessment | null>;
    publishAssessment: (id: string) => Promise<boolean>;
    addQuestionsToAssessment: (assessmentId: number, questions: AssessmentQuestionInput[]) => Promise<boolean>;

    // Grading Actions
    fetchAttempt: (id: string) => Promise<void>;
    gradeAnswer: (input: GradeAnswerInput) => Promise<boolean>;

    // Grade Scale Actions
    fetchGradeScales: (branchId?: number) => Promise<void>;
    addGradeScale: (input: GradeScaleInput) => Promise<GradeScale | null>;
    updateGradeScale: (id: string, input: UpdateGradeScaleInput) => Promise<GradeScale | null>;

    // Report Card Actions
    fetchReportCards: (filters?: {
        branchId?: number;
        academicYearId?: number;
        classId?: number;
        studentId?: number;
        term?: string;
        skip?: number;
        take?: number;
    }) => Promise<void>;
    generateReportCard: (input: ReportCardInput) => Promise<ReportCard | null>;
    publishReportCard: (id: string) => Promise<boolean>;

    // Utility Actions
    setSelectedQuestion: (question: Question | null) => void;
    setSelectedAssessment: (assessment: Assessment | null) => void;
    setSelectedAttempt: (attempt: StudentAssessmentAttempt | null) => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
    // Initial State
    questions: [],
    selectedQuestion: null,
    questionCategories: [],
    assessments: [],
    selectedAssessment: null,
    attempts: [],
    selectedAttempt: null,
    gradeScales: [],
    reportCards: [],
    loading: false,
    error: null,

    // Question Actions
    fetchQuestions: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_QUESTIONS,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            set({ questions: data.questions, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchQuestion: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_QUESTION,
                variables: { id },
            });
            set({ selectedQuestion: data.question, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchQuestionCategories: async (branchId, subjectId) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_QUESTION_CATEGORIES,
                variables: { branchId, subjectId },
                fetchPolicy: 'network-only',
            });
            set({ questionCategories: data.questionCategories, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addQuestion: async (input: QuestionInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_QUESTION,
                variables: { input },
            });
            await get().fetchQuestions();
            set({ loading: false });
            return data.addQuestion;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateQuestion: async (id: string, input: UpdateQuestionInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_QUESTION,
                variables: { id, input },
            });
            await get().fetchQuestions();
            set({ loading: false });
            return data.updateQuestion;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteQuestion: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_QUESTION,
                variables: { id },
            });
            await get().fetchQuestions();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    addQuestionCategory: async (input: QuestionCategoryInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_QUESTION_CATEGORY,
                variables: { input },
            });
            await get().fetchQuestionCategories();
            set({ loading: false });
            return data.addQuestionCategory;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Assessment Actions
    fetchAssessments: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ASSESSMENTS,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            set({ assessments: data.assessments, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchAssessment: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ASSESSMENT,
                variables: { id },
            });
            set({ selectedAssessment: data.assessment, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    createAssessment: async (input: AssessmentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: CREATE_ASSESSMENT,
                variables: { input },
            });
            await get().fetchAssessments();
            set({ loading: false });
            return data.createAssessment;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateAssessment: async (id: string, input: UpdateAssessmentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_ASSESSMENT,
                variables: { id, input },
            });
            await get().fetchAssessments();
            set({ loading: false });
            return data.updateAssessment;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    publishAssessment: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: PUBLISH_ASSESSMENT,
                variables: { id },
            });
            await get().fetchAssessments();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    addQuestionsToAssessment: async (assessmentId: number, questions: AssessmentQuestionInput[]) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: ADD_QUESTIONS_TO_ASSESSMENT,
                variables: { assessmentId, questions },
            });
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    // Grading Actions
    fetchAttempt: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STUDENT_ASSESSMENT_ATTEMPT,
                variables: { id },
            });
            set({ selectedAttempt: data.studentAssessmentAttempt, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    gradeAnswer: async (input: GradeAnswerInput) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: GRADE_ANSWER,
                variables: { input },
            });
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    // Grade Scale Actions
    fetchGradeScales: async (branchId) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_GRADE_SCALES,
                variables: { branchId },
                fetchPolicy: 'network-only',
            });
            set({ gradeScales: data.gradeScales, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addGradeScale: async (input: GradeScaleInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_GRADE_SCALE,
                variables: { input },
            });
            await get().fetchGradeScales();
            set({ loading: false });
            return data.addGradeScale;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateGradeScale: async (id: string, input: UpdateGradeScaleInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_GRADE_SCALE,
                variables: { id, input },
            });
            await get().fetchGradeScales();
            set({ loading: false });
            return data.updateGradeScale;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Report Card Actions
    fetchReportCards: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_REPORT_CARDS,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            set({ reportCards: data.reportCards, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    generateReportCard: async (input: ReportCardInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: GENERATE_REPORT_CARD,
                variables: { input },
            });
            await get().fetchReportCards();
            set({ loading: false });
            return data.generateReportCard;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    publishReportCard: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: PUBLISH_REPORT_CARD,
                variables: { id },
            });
            await get().fetchReportCards();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    // Utility Actions
    setSelectedQuestion: (question) => set({ selectedQuestion: question }),
    setSelectedAssessment: (assessment) => set({ selectedAssessment: assessment }),
    setSelectedAttempt: (attempt) => set({ selectedAttempt: attempt }),
}));
