/*

diplay on allResumes route the whole data of each resume created

** fix: export to pdf the dada - not empty page !!
** fix: require any input tag !!
** fix: submit the data - not empty strings !!
** make: typing on input form ---> will show up on resumeTable (in any route!)

ROUTE:SUBMITINPUTFORM
** split <inputform>
** split <submit>
** create <submitInput> = <inputform> + <submit>

ROUTE: CREATEPDFRESUME
** split <resumeTable>
** split <pdfButton>
** create <createPdfResume> = <resumeTable> + <pdfButton>


** create <resumetable> by map()
** show on live inputs values inside resume table component
** pass data between <inputsform> to <resumeTable> or on <pdfresume> component

** display on \ResumeTable\ component the inputs values of \InputsForm\ component

---------------------------------------------------
* create: saperate component for render inputs
* create: saperate component for button exportPdf
* create: saperate component for button submit

** and then : call only the resume form to \allResume\ component

1. show all resumes with :
 a. all data without the id. 
 b. diplay it in css style = like the resume form

[ focus on \allResume\ component funcs to solve that ]

2. style forms that display on \allResume\ component 






INFO LISTS:
-------------




===================

1. STYLING THE PDF:

* my screen sizes: hight 619.33px, withd > 1029.33px

1. full name = 24-28 px

2. experty = 17-21 px

3. contact (phone, email, github
    , linkedin) = 11-15 px

4. headers (education, experience, projects, 
    project names skills) = 17-21 px

5. mini headers (school / courses names) = 12.5- 16.5 px
------------------------------------------------------------

- LEFT GRID = 1/3 = full name, experty, education, certificates, gpa, links, mail, 
phone, github, linkedin, facebook, portifolio, instagram

-RIGHT GRID =2/3 = expreince, side projects, 
skills (programming Programming languages, 
db, frameworks, general knowledge)

========================================================

*/