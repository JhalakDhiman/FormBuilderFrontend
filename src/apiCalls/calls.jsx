import { apiConnector } from "./apiConnector";
import toast from 'react-hot-toast'
import { endpoints } from "./apis";

export const addForm = async (formData) => {
    const toastId = toast.loading("Loading.....");
    try{
        console.log("Adding form with data:", formData);
        const response = await apiConnector('POST', endpoints.ADD_FORM, formData, {
            'Content-Type': 'multipart/form-data',
        });
        return response.data;
    } catch (error) {
        console.error("Error adding form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const addClozeQuestion = async ({statement,options,form}) => {
    const toastId = toast.loading("Loading.....");
    try{
        const response = await apiConnector('POST', endpoints.ADD_CLOZE_QUESTION, {statement,options,form});
        console.log("Cloze question added successfully:", response);
    } catch (error) {
        console.error("Error adding form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const deleteClozeQuestion = async({formId,id})=>{
    const toastId = toast.loading("Loading.....");
    try{
        const res = await apiConnector('POST',endpoints.DELETE_CLOZE_QUESTION,{formId,id});
        console.log(res);
    } catch(e){
        console.log(e);
        toast.error(e.response.data.message);
        throw e;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const editClozeQuestion = async ({statement,options,clozeQuestionId}) => {
    const toastId = toast.loading("Loading.....");
    try{
        console.log(statement,options,clozeQuestionId)
        const response = await apiConnector('POST', endpoints.EDIT_CLOZE_QUESTION, {statement,options,clozeQuestionId});
        console.log("Cloze question added successfully:", response);
        return;
    } catch (error) {
        console.error("Error editing form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const getFormData = async(formId)=>{
    const toastId = toast.loading("Loading.....");
    try{
        const res = await apiConnector('GET',`${endpoints.FETCH_FORM_DATA}/${formId}`);
        console.log("Form data fetched successfully:", res.data);
        return res.data.form;
    } catch(e){
        console.error("Error fetching form data:", e);
        toast.error(e.response.data.message);
        throw e;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const addParagraphQuestion = async ({paragraph,questions,formId}) => {
    const toastId = toast.loading("Loading.....");
    try{
        const response = await apiConnector('POST', endpoints.ADD_PARAGRAPH_QUESTION, {paragraph,questions,formId});
        console.log(response.data);
    } catch (error) {
        console.error("Error adding form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const editParagraphQuestion = async ({paragraph,questions,paragraphQuestionId}) => {
    const toastId = toast.loading("Loading.....");
    try{
        const response = await apiConnector('POST', endpoints.EDIT_PARAGRAPH_QUESTION, {paragraph,questions,paragraphQuestionId});
        console.log(response.data);
    } catch (error) {
        console.error("Error adding form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const deleteParagraphQuestion = async ({id,formId}) => {
    const toastId = toast.loading("Loading.....");
    try{
        const response = await apiConnector('POST', endpoints.DELETE_PARAGRAPH_QUESTION, {id,formId});
        console.log(response.data);
    } catch (error) {
        console.error("Error adding form:", error);
        toast.error(error.response.data.message);
        throw error;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const addCategoryQuestion = async(data)=>{
    const toastId = toast.loading("Loading.....");
    try{
        const res = await apiConnector('POST',endpoints.ADD_CATEGORY_QUESTION,data);
        console.log(res);
    } catch(e){
        console.log(e);
        toast.error(e.response.data.message);
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const editCategoryQuestion = async(data)=>{
    const toastId = toast.loading("Loading.....");
    try{
        const res = await apiConnector('POST',endpoints.EDIT_CATEGORY_QUESTION,data);
        console.log(res);
    } catch(e){
        console.log(e);
        toast.error(e.response.data.message);
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const deleteCategoryQuestion = async({categoryQuestionId,formId})=>{
    const toastId = toast.loading("Loading.....");
    try{
        const res = await apiConnector('POST',endpoints.DELETE_CATEGORY_QUESTION,{categoryQuestionId,formId});
        console.log(res);
    } catch(e){
        console.log(e);
        toast.error(e.response.data.message);
    }
    finally{
        toast.dismiss(toastId);
    }
}