import { sql } from "../config/db.js";

export const publishForm = async (req, res) => {
    console.log(JSON.stringify(req.body));
    const { userId, formFields } = req.body;
    console.log(userId);
    console.log(formFields);
    try {
        const result = await sql`
        INSERT INTO forms (user_id, form_fields, title)
        VALUES (${userId}, ${JSON.stringify(formFields)}, ${formFields.title})
        RETURNING *
        `;
        console.log(result);
        return res.status(201).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false });
    }
}

export const publishTemplate = async (req, res) => {
    const { userId, formFields } = req.body;
    try {
        const result = await sql`
        INSERT INTO templates (user_id, template_fields, title)
        VALUES (${userId}, ${JSON.stringify(formFields)}, ${formFields.title})
        RETURNING *
        `;
        console.log(result);
        return res.status(201).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false });
    }
}

export const getForms = async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await sql`
        SELECT uuid, title, created_at, responses
        FROM forms 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        `;
        console.log(result);
        return res.status(200).json({ success: true, data: result });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ success: false });
    }
}

export const getTemplates = async (req, res) => {
    try {
        const result = await sql`
        SELECT uuid, user_id, name, title
        FROM templates t
        JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC
        `;
        console.log(result);
        return res.status(200).json({ succes: true, data: result });
    } catch (e) {
        return res.status(500).json({ succes: false });
    }
}

export const getForm = async (req, res) => {
    const { formId } = req.query;
    try {
        const result = await sql`
        SELECT form_fields
        FROM forms 
        WHERE uuid = ${formId}
        `;
        console.log(result);
        return res.status(200).json({ success: true, data: result[0] });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ success: false });
    }
}

export const getTemplate = async (req, res) => {
    console.log(req.query);
    try {
        const {templateId} = req.query;
        const result = await sql`
        SELECT template_fields
        FROM templates 
        WHERE uuid = ${templateId}
        `;
        console.log(result);
        return res.status(200).json({ success: true, data: JSON.parse(result[0].template_fields) });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ success: false });
    }
}

export const formSubmission = async (req, res) => {
    const submissionData = req.body.formData;
    const formId = req.body.formId;
    try {
        const result = await sql`
        INSERT INTO submissions (submission_data, form_id)
        VALUES (${submissionData}, ${formId})
        RETURNING *;
        `;
        const result1 = await sql`
        UPDATE forms
        SET responses = responses + 1
        WHERE uuid = ${formId}
        `;
        console.log(result);
        return res.status(201).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false });
    }
}

export const deleteForm = async (req, res) => {
    console.log(req.body.uuid);
    const { uuid } = req.body
    try {
        const result = await sql`
        DELETE FROM forms
        WHERE uuid = ${uuid}
        `;
        const result2 = await sql`
        DELETE FROM submissions
        WHERE form_id = ${uuid}
        `;
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ success: false });
    }
}

export const getResponses = async (req, res) => {
    const { uuid, userId } = req.query;
    try {
        const result = await sql`
        SELECT user_id FROM forms
        WHERE uuid = ${uuid}
        `;
        console.log(result);
        if (result.length == 0) {
            return res.status(404).json({ message: "Requested form doesn't exist" });
        }
        if (result[0].user_id != userId) {
            return res.status(403).json({ message: "Access Denied" });
        }
        const result1 = await sql`
        SELECT submission_data FROM submissions
        WHERE form_id = ${uuid}
        `;
        const result2 = await sql`
        SELECT form_fields FROM forms
        WHERE uuid = ${uuid}
        `;
        console.log(result1);
        return res.status(200).json({ responses: result1, formFields: JSON.parse(result2[0].form_fields) });
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
