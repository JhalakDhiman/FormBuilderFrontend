const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    ADD_FORM: `${BASE_URL}/form/addForm`,
    ADD_CLOZE_QUESTION: `${BASE_URL}/cloze/addClozeQuestion`,
    ADD_PARAGRAPH_QUESTION: `${BASE_URL}/paragraph/addParagraphQuestion`,
    EDIT_PARAGRAPH_QUESTION: `${BASE_URL}/paragraph/editParagraphQuestion`,
    DELETE_PARAGRAPH_QUESTION: `${BASE_URL}/paragraph/deleteParagraphQuestion`,
    ADD_CATEGORY_QUESTION: `${BASE_URL}/category/addCategoryQuestion`,
    EDIT_CATEGORY_QUESTION: `${BASE_URL}/category/editCategoryQuestion`,
    DELETE_CATEGORY_QUESTION: `${BASE_URL}/category/deleteCategoryQuestion`,
    FETCH_FORM_DATA:`${BASE_URL}/form/getForm`,
    EDIT_CLOZE_QUESTION: `${BASE_URL}/cloze/editClozeQuestion`,
    DELETE_CLOZE_QUESTION: `${BASE_URL}/cloze/deleteClozeQuestion`,
}
