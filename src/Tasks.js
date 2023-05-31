/*
@@ how to use patch package ? ?

probebly warrnings from react-reval animation package:

- use react reveal awesome package instead - check if the warring is realy disappear
- maby command `npx react-codemod rename-unsafe-lifecycles`
- leave that as is by knowing that it's only warrning

ERRORS:

fix: bundle.js:126686 Warning: Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: RevealBase


fix: Warning: componentWillReceiveProps has been renamed, and is not recommended for use.

In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.

Please update the following components: RevealBase

------

logout components: maybe add dynamic name "goodbey {userName}" 


-------------

RESUME

! make ADD the clicked index of bullet list
! make DELETE the clicked index of bullet list

==============

1. make left gray back ground under the orange

2. create todo for headres

3. create todo for mini headers

 ------------------

! consider create few templates (3-4) with different style - 
 as few components / onclick function change their classname

 ---------------------
 

GIF

! create loading gif component for: 


1. submit new cv (inputs.js)
2. delete cv (all resume.js)
3. register
4. login regular
5. login with google
6. when contact
7. when logout

--------

AUTH

make: delete account function

make: edit resume function 

-----------

CSS

!! match all screen sizes

add: options for fonts on <resumetable>
add: options for colors on <resumetable>
fix: display the wanted favicon

-----------------------

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