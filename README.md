**Brief about the website :**

Coursent is a course content management system. It is an online learning platform used either to provide a digital supplement for a traditional classroom that meets regularly in person or to host an online course over the internet.

Here a user can create a new course as well as view other courses. Every course created will follow a week-wise schedule for updates regarding any course, which would be visible in the course stream section. Also every course has its attached discussion channel where any student following the course can resolve his/her doubts parallely with the course creator. Furthermore a user can also upload videos or pdf resources weekly.

It provides google based sign in/login feature for ease of access and user security. The website model is thus divided into two parts : guest and authorized user. If a user is logged in he/she can view all the pages and can make full use of all the features of the website. However a user can still view the created courses and get the overview of the website without signing in.

The database part involves users, sessions and courses. Everytime a new user signs in his/her information would be updated into the database in the user schema. We have also implemented sessions so that a user can stay logged in whenever he visits the website again. The sessions of each user are stored in the sessions schema of the database. Everytime any user creates a new course, all the details regarding that particular course with the user id will be saved in the courses schema of the database.
