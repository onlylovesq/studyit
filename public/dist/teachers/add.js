"use strict";define("/dist/teachers/add",["validate","form","datepicker","language"],function(e,a,s){e("validate"),e("form"),e("datepicker"),e("language"),$("#datetimepicker").datetimepicker({initialDate:new Date,format:"yyyy-mm-dd",language:"zh-CN",autoclose:!0,minView:2}),$("#addTeacher").validate({onKeyup:!0,sendForm:!1,eachInvalidField:function(){$(this).parents(".form-group").removeClass("has-success").addClass("has-error"),$(this).next().removeClass("glyphicon-ok").addClass("glyphicon-remove")},eachValidField:function(){$(this).parents(".form-group").addClass("has-success").removeClass("has-error"),$(this).next().addClass("glyphicon-ok").removeClass("glyphicon-remove")},valid:function(){var e=$(this).attr("action").trim();$(this).ajaxSubmit({url:e,type:"post",success:function(e){1e4==e.code&&location.reload(),alert(e.msg)}})}})});