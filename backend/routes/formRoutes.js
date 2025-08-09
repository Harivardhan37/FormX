import express from "express";
import { deleteForm, formSubmission, getForm, getForms, getResponses, getTemplate, getTemplates, publishForm, publishTemplate } from "../controllers/formController.js";

const router = express.Router();

router.post("/publish-form", publishForm);
router.post("/publish-template", publishTemplate);
router.get("/get-forms", getForms);
router.get("/get-templates", getTemplates);
router.get("/get-form", getForm);
router.get("/get-template", getTemplate);
router.post("/submit-form", formSubmission);
router.delete("/delete", deleteForm);
router.get("/get-responses", getResponses);
// router.post("change", Change);
// router.post("/publish-template", publishTemplate);

export default router;