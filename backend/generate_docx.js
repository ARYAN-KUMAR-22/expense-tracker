const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const path = require('path');

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: 'Software Requirements Specification (SRS)',
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [new TextRun({ text: 'Expense Tracker Application', bold: true, size: 28 })]
                }),
                new Paragraph({ text: '' }),
                new Paragraph({ text: '1. Introduction', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: '1.1 Purpose' }),
                new Paragraph({ text: 'The purpose of this document is to specify the software requirements for the "Expense Tracker" web application. This application provides users with an intuitive interface to track finances, visualize spending, and manage budgets efficiently, now featuring Auth and RBAC.' }),
                
                new Paragraph({ text: '1.2 Scope', spacing: { before: 200 } }),
                new Paragraph({ text: 'The application is a MERN SPA. Core features: adding transactions, dashboard visualizations, data import/export (CSV file handling), JWT Auth, and Admin-level multi-tenant views.' }),
                
                new Paragraph({ text: '1.3 Definitions and Acronyms', spacing: { before: 200 } }),
                new Paragraph({ text: '- SRS: Software Requirements Specification\n- MERN: MongoDB, Express, React, Node.js\n- RBAC: Role-Based Access Control\n- SPA: Single Page Application' }),

                new Paragraph({ text: '2. Features Overview', heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: '- User Auth (Register/Login)' }),
                new Paragraph({ text: '- Landing Page' }),
                new Paragraph({ text: '- Admin Dashboard (View all users)' }),
                new Paragraph({ text: '- User Dashboard (Personal Finances)' }),
                new Paragraph({ text: '- Export & Import Data Features (CSV)' }),
                new Paragraph({ text: '- Database Test Seeding Functionality' }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, '../docs/SRS.docx'), buffer);
    console.log('Document created successfully at docs/SRS.docx');
});
