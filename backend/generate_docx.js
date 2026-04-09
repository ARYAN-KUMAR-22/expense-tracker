const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const path = require('path');

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: 'Software Requirements Specification',
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [new TextRun({ text: 'ExpanseTracker - IEEE 830 Standard', bold: true, size: 28 })]
                }),
                new Paragraph({ text: '', spacing: { before: 200 } }),
                
                // 1. Introduction
                new Paragraph({ text: '1. Introduction', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: '1.1 Purpose', heading: HeadingLevel.HEADING_3 }),
                new Paragraph({ text: 'The purpose of this document is to define the software requirements for ExpanseTracker. It details the functional and non-functional requirements, acting as the primary blueprint for the MERN stack development.' }),
                
                new Paragraph({ text: '1.2 Document Conventions', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'This document adheres to the IEEE 830-1998 standard for Software Requirements Specifications. Priorities assigned to functional requirements assume "High" for core loop functionality and "Medium" for analytics.' }),
                
                new Paragraph({ text: '1.3 Intended Audience', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'This document is intended for full-stack developers, QA testers, and product managers involved in validating the SaaS deployment of ExpanseTracker.' }),
                
                new Paragraph({ text: '1.4 Product Scope', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'ExpanseTracker is a robust financial dashboard system. Users can authenticate securely, log real-time expenses and incomes, categorize them, establish budget ceiling limits, and generate real-time graphical analytics including line charts and categorical pie charts. This tool aims to promote financial literacy.' }),
                
                // 2. Overall Description
                new Paragraph({ text: '2. Overall Description', heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: '2.1 Product Perspective', heading: HeadingLevel.HEADING_3 }),
                new Paragraph({ text: 'ExpanseTracker is a self-contained Single Page Application (SPA) driven by a RESTful Node/Express architecture and a MongoDB non-relational database.' }),
                
                new Paragraph({ text: '2.2 Product Functions', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: '- User isolation via JSON Web Tokens\n- Expense and Income Entry logging (with Recurring support)\n- Dynamic Visual Analytics (Chart.js)\n- Budget Overspending Warning System\n- Global CSV Data Extraction' }),
                
                new Paragraph({ text: '2.3 User Classes and Characteristics', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: '1. Standard Users: Require clean, simple UI to track their isolated budget goals.\n2. Administrators: Require high-level oversight of system data flow and aggregated scaling constraints.' }),
                
                new Paragraph({ text: '2.4 Operating Environment', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'Cross-browser compatible. Client devices require Chrome, Firefox, Safari, or Edge. Backend server operates securely within a Node.js V16+ runtime locally.' }),

                // 3. System Features
                new Paragraph({ text: '3. System Features', heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: '3.1 Authentication & Authorization', heading: HeadingLevel.HEADING_3 }),
                new Paragraph({ text: 'Description: Secure credential establishment mapping directly to a User Schema using bcryptjs hashing. Tokens govern API middleware access.' }),
                
                new Paragraph({ text: '3.2 Financial Logging', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'Description: Recording positive (Income) and negative (Expense) financial events. Features metadata assignment (Title, Amount, Category, Description).' }),

                new Paragraph({ text: '3.3 Budget Analysis', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'Description: Compares aggregated categorical expenditures against pre-defined user limits. Renders alert layers to the DOM upon limit eclipse.' }),

                // 4. Nonfunctional Requirements
                new Paragraph({ text: '4. Nonfunctional Requirements', heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: '4.1 Performance Requirements', heading: HeadingLevel.HEADING_3 }),
                new Paragraph({ text: 'The RESTful API must respond to queries within 250ms natively. The client DOM must refresh state optimally using React hooks without re-rendering unnecessarily.' }),
                
                new Paragraph({ text: '4.2 Security Requirements', heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
                new Paragraph({ text: 'All user data must be cryptographically sandboxed to the `user` reference field. Passwords must never be stored in plain text.' }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, '../docs/SRS.docx'), buffer);
    console.log('IEEE Specification Document created successfully at docs/SRS.docx');
});
