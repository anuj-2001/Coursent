var courseName="";
var courseDescription="";
var prerequisite="";
var weekContent="";

function saveCourse(){
    var cname = document.getElementById('cname');
    var cdesc = document.getElementById('cdesc');
    var pre = document.getElementById('pre');
    var wcontent = document.getElementById('wcontent');
    var course=[cname,cdesc,pre,wcontent]
    console.log(course)
    courseName=cname.value;
    courseDescription=cdesc.value;
    prerequisite=pre.value;
    weekContent=wcontent.value;
    window.location.href = 'course-stream.html';
}




