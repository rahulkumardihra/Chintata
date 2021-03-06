/*global moment*/


var LoggedUser=fsi.getLoggedUserId();
var lastIssueDate;
var lastSysId;
var commentData;
var systID;


function BtnDelete(button)
{
  //alert("in delete");
  debugger;
  var result = fsi.confirm('Are you sure you wish to delete this Issue?');
  //alert("in after result");
  if (result === true){
    var inputs = {};
    var outputs = {};
    
    inputs.Sysid = button.name;
    
    fsi.workflow('Delete Issue', inputs, outputs, null, 
                 function(responseData){fsi.changePage('Comment');},
                 function(errorData){}); 
  }
  
}

function sharePage(button)
{
  debugger;
  
  var sysCommentShare = fsi.globalVariable("IssueId");
  fsi.globalVariable("IssueId",button.name);
  
  //fsi.setById('txtSystemId',sys1);
 // fsi.pageParameter("IssueId",button.name);
  fsi.changePage('SharePage');
}


function AddIssue(liked,issues,userImage, userHandle, points, text, time, privacy, noLikes, noComments, systemId,image, userSystemId){
  debugger;
  // alert('id is in Add issues' );
    var show_del  = false;
  var issue = 
      '<div class="swiper-slide">' +
        '<!-- Card Projects -->' +
          '<div class="col-md-6 col-md-offset-3" style="width: 99%;">' +
            '<div class="card white">' +
              '<div class="card-user">' +
                '<button name="' + userSystemId + '" type="button" class="btn btn-default pull-right standard-dark-icons" onClick="userProfilePage(this)"><img class="img-responsive userpic" src="data:image/png;base64,' + userImage + '"></button>' +
                  '<p class="carduser-points">' + points + ' Points</p>' +
                    '</div>' +
                      '<div class="card-content">' +
                        '<p>' + userHandle + '</p>' +
                          '<p>' + text + '</p>' +
                            '</div>';
  
  
  
  issue = issue + '<div class="card-action">' +
    '<span>' + time + '</span>' +
      //'<button type="button" class="btn btn-default pull-right btnDots" data-toggle="popover"><img src="" width="20" /></button>' +
        '<button name="' + systemId + '" type="button" class="btn btn-default pull-right standard-dark-icons btncomment" onClick="btnComment(this)"><img src="" width="20" /> ' + noComments + '</button>';  
  
  //if current user logged the issue then disable me too button
    var userstatus = fsi.globalVariable('userstatus');


  if( userstatus == 'Admin')
  {
    show_del = true;
  }

  if(LoggedUser == userSystemId){
    show_del = true;
  }
  else{
    // If the current user has already liked the comment then set image to orange hand else set to black
    if (liked==1)
    {
      
      issue = issue + '<button name="' + systemId + '" type="button" class="btn btn-default pull-right standard-orange-icons" onClick="btnLike(this)"><img src="" width="20" /> ' + noLikes + '</button>';
    }
    else
    {
      issue = issue + '<button name="' + systemId + '" type="button" class="btn btn-default pull-right standard-dark-icons black" onClick="btnLike(this)"><img src="" width="20" /> ' + noLikes + '</button>';
    }
  }
  issue = issue + 
    '</div>';
  if (privacy == 'Private'){issue = issue + '<div class="card-block"><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAYAAAB2pebxAAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI9JREFUeNpi/P//PwMMqCgoCgCpBCAuAGJ5BkzwEIgXAPGEOw/uf4AJMqEpCgDifhwGMEDF66EWMeAypIGBOFCAzxBkF2wEYkckvBCHOgYWPLaB/H0AKbxAVDw2hUwMVACMyvIKBdCw4CdD/0eQXpAh/yl1CVW8M2rIqCHEGvKRUkNYoAUMCAuQacYEgAADAGatGpchhHu0AAAAAElFTkSuQmCC" width="20" /> This issue is marked as private</p> </div>';}
  
  issue = issue +
    '</div>' +
      '</div>' +
        '</div>';
  
  $("[data-control-id='pnlIssue']").append(issue);
  
  
  /*if(issues=='Complete' || issues=='Assigned')
  {
    //alert("inside if");
    $('[data-toggle="popover"]').popover({
      placement : 'left',
      html : true,
      trigger : 'hover',
      content : '<div><button name="' + systemId + '" type="button" class="btn btn-default standard-dark-icons share test-icon" onClick="sharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />Share</button></div>'
    });
  }
  else
  {
    //alert("inside else");
    $('[data-toggle="popover"]').popover({
      placement : 'left',
      html : true,
      trigger : 'hover',
      content : '<div><button name="' + systemId + '" type="button" class="btn btn-default standard-dark-icons del test-icon" onClick="BtnDelete(this)">  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHNJREFUeNpi/P//PwMIqCgoCgCpB0DMz4AAB+88uO8A47AAFcE4BlCFjkj8fiT5D4zK8gr/GYgDB1mAhCDUFHzgA9A5F1igCvcTMhWIHZiQBBwJ0AxMDCSAoa44gQDNwAhKG8AoXQBkK+AxdAMwUiYABBgAdssew6bT+jsAAAAASUVORK5CYII=" width="20" />  Delete</button></div><div><button name="' + systemId + '" type="button" class="btn btn-default standard-dark-icons share" onClick="sharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />    Share</button></div>'
    });
  }*/
}




function buildComment(userImage,commentID,text, time,userid,  liked,NoLikes,commentImage)
{
  
  
  var comment = 
      '<div class="container-fluid">' +
        '<div class="row" style="margin-left: 0px;">' +
          '<!-- Card Projects -->' +
            '<div class="col-md-6 col-md-offset-3" >' +
              '<div class="card peach">' +
                '<div class="card-user">' +
                  '<img class="img-responsive userpic" src="data:image/png;base64,' + userImage + '">' +
                    '</div>' +
                      '<div class="card-content">' +
                        '<p>' + text + '</p>' +
                          '</div>';
  
  if (commentImage.length > 0){
    comment = comment + '<div class="card-content">' +
      '<img class="card-image" src="data:image/png;base64,' + commentImage + '">' +
        '</div>';
  }
  
  comment = comment + '<div class="card-action">' +            
    '<span>' + time + '</span>' +  
      '<button type="button" class="btn btn-default pull-right btnDots" data-toggle="comentPopover"><img src="" width="20" /></button>';
  
  // If the current user has already liked the comment then set image to orange hand else set to black
  if (liked==1)
  {
    comment = comment + '<button name="' + commentID + '" type="button" class="btn btn-default pull-right unlike" onClick="btnLikecomment(this)"><img src="" width="20" />' +  NoLikes + ' Like </button>';
    
    
  }
  else
  {
    if(NoLikes === undefined){
      NoLikes = 0; 
    }
    
    if(LoggedUser!=userid)
    {comment = comment + '<button name="' + commentID + '" type="button" class="btn btn-default pull-right black like" onClick="btnLikecomment(this)"><img src="" width="20" /> ' +  NoLikes + ' Like </button>';
     
    }
  }
  
  
  comment = comment +
    '</div>' +
      '</div>' +
        '</div>' +
          '</div>' +
            '</div>';
  
  return comment;
  
}



function BtnDeleteComment(button)
{
  //alert("in delete");
  debugger;
  var result = fsi.confirm('Are you sure you wish to delete this Comment?');
  //alert("in after result");
  if (result === true){
    var inputs = {};
    var outputs = {};
    //alert("inputs.Sysid" + " " + inputs.Sysid);
    //alert("button.name" + " " + button.name);
    
    inputs.SysId = button.name;
    //inputs.UserId = button.name;
    
    fsi.workflow('DeleteComment', inputs, outputs, null, 
                 function(responseData){
                   fsi.globalVariable("SYSTEMID",fsi.getById('txtSystemId'));
                   fsi.changePage('Comment');},
                 function(errorData){}); 
  }
  
}


function comentSharePage(button)
{
  debugger;
  fsi.pageParameter("CommentId",button.name);
  fsi.globalVariable("SYSTEMID",fsi.getById('txtSystemId'));
  fsi.changePage('CommentSharePage');
}

function defineComment(item, dateLogged1,commentImage,i,callback){
  var comment = '';
  var image = searchAvatars(item.UserId);
  if (image.length > 0){
   comment = buildComment(image,item.SystemID,item.CommentDesc, dateLogged1,item.UserId,item.Liked, item.NoLikes,commentImage); 
        // Append to the container
    $("[data-control-id='pnlComments']").append(comment);
    
    if(comment=='Complete' || comment=='Assigned')
    {
      $('[data-toggle="comentPopover"]').popover({
        placement : 'left',
        html : true,
        
        content : '<div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons share test-icon" onClick="comentSharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />Share</button></div>'
      });
    }
    else
    {
      $('[data-toggle="comentPopover"]').popover({
        placement : 'left',
        html : true,
        
        content : '<div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons del test-icon" onClick="BtnDeleteComment(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHNJREFUeNpi/P//PwMIqCgoCgCpB0DMz4AAB+88uO8A47AAFcE4BlCFjkj8fiT5D4zK8gr/GYgDB1mAhCDUFHzgA9A5F1igCvcTMhWIHZiQBBwJ0AxMDCSAoa44gQDNwAhKG8AoXQBkK+AxdAMwUiYABBgAdssew6bT+jsAAAAASUVORK5CYII=" width="20" />  Delete</button></div><div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons share test-icon" onClick="comentSharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />    Share</button></div>'
      });
    }
    
    i = i + 1;
    callback(i);
  }
  else{
    var inputs2 = {};
    var outputs2 = {};
    inputs2.UserId = item.UserId;
    fsi.workflow('GetUserImage', inputs2, outputs2, null, 
                 function(responseData){
                   image = JSON.parse(responseData.Image).Output[0].Picture;
                   
                   addAvatar(item.UserId,image);
                   var Sysid = item.SystemID;
                   
                   comment =  buildComment(image,item.SystemID,item.CommentDesc, dateLogged1,item.UserId,item.Liked, item.NoLikes,commentImage);
                     // Append to the container
                    $("[data-control-id='pnlComments']").append(comment);
                    
                    if(comment=='Complete' || comment=='Assigned')
                    {
                      $('[data-toggle="comentPopover"]').popover({
                        placement : 'left',
                        html : true,
                        
                        content : '<div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons share test-icon" onClick="comentSharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />Share</button></div>'
                      });
                    }
                    else
                    {
                      $('[data-toggle="comentPopover"]').popover({
                        placement : 'left',
                        html : true,
                        
                        content : '<div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons del test-icon" onClick="BtnDeleteComment(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHNJREFUeNpi/P//PwMIqCgoCgCpB0DMz4AAB+88uO8A47AAFcE4BlCFjkj8fiT5D4zK8gr/GYgDB1mAhCDUFHzgA9A5F1igCvcTMhWIHZiQBBwJ0AxMDCSAoa44gQDNwAhKG8AoXQBkK+AxdAMwUiYABBgAdssew6bT+jsAAAAASUVORK5CYII=" width="20" />  Delete</button></div><div><button name="' + item.SystemID + '" type="button" class="btn btn-default standard-dark-icons share test-icon" onClick="comentSharePage(this)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKpJREFUeNpi+f//PwMh4ObtNwFI5QNxISMhDUDFAUBqPYzPgkehAJAqgGIGnBrQFPID8UEgPgDECkD8gNHVy9cAyGgA4gtADFKcgKSwYdfWTQfQbdgAxPJA7A8Vw6oQBpigipHBAlyKYRoCgfgjlH8RiOcD/fEAiBOwaQAHK1BSAWjqA6inHaB+sgfih1A2A9TTE3DGA5pGGLhITMTBYhnuB0JgAbINAAEGANb2POJF6eO5AAAAAElFTkSuQmCC" width="20" />    Share</button></div>'
                      });
                    }
                    
                    i = i + 1;
                    callback(i);
                 },function(errorData){debugger;}); 
  }
}

function processComment(item, i, callback, sysId){
  var comment;
  var image;
  var dateLogged1;
  var inputs = {};
  var commentImage = '';
  
  debugger;
  lastIssueDate = moment.utc(item.CommentDate).format("MMM DD YYYY HH:mm:ss");
  
  
  dateLogged1 = moment(item.CommentDate).format("MMM DD YYYY HH:mm");
  
  dateLogged1 = friendlyDate(dateLogged1);
  
  // Check for comment picture and load
  if (item.Image !== null){
    var inputs3 = {};
    var outputs3 = {};
    inputs3.SystemId = item.SystemID;
    fsi.workflow('GetCommentPicture', inputs3, outputs3, null, 
                 function(responseData){
                   commentImage = JSON.parse(responseData.Picture)[0].Content;
                   defineComment(item,dateLogged1,commentImage,i,callback);
                 },function(errorData){debugger;}); 
  }
  else{
     defineComment(item,dateLogged1,"",i,callback);
  }
  
}

function GenerateCommentCard(i, sysId)
{
  
  if (i < commentData.length){
    //alert("commentalert" + " " + commentData[i].CommentDate);
    processComment(commentData[i],i,GenerateCommentCard, sysId);
  }
  
  
}

function GetIssue(sysId){
  //var dateLogged1;
  var dateLogged;
  var inputs = {};
  var outputs = {};
  var issue;
  
  inputs.SystemId = sysId; //"7f9eb921-1c6c-48a2-8098-38a10fa2931e";
  inputs.LoadRelatedRecords = false;
  
  fsi.workflow('GetIssueDetail', inputs, outputs, null, 
               function(responseData){
                 debugger;
                 
                 issue = JSON.parse(responseData.Issue).Output[0];
                 var userImage; //= JSON.parse(issue.Avatar)[0].Content;
                 
                 var image = '';
                 
                 if ( JSON.parse(issue.IssuePic).length > 0){
                   image = JSON.parse(issue.IssuePic).Content[0]; 
                 }
                 //alert("issue.LoggedDate" + " " + issue.LoggedDate);
                 
                 lastIssueDate = moment.utc(issue.LoggedDate).format("MMM DD YYYY HH:mm:ss");
                 //alert("issue.LoggedDate" + " " + lastIssueDate);
                 
                 lastSysId = sysId;
                 
                 dateLogged = moment(issue.LoggedDate).format("MMM DD YYYY HH:mm");
                 
                 dateLogged = friendlyDate(dateLogged);
                 
                 userImage = searchAvatars(issue.UserId);
                 if (userImage.length > 0){
                   AddIssue(issue.Liked,issue.IssueStatus,userImage,issue.SocialHandle,issue.UserPoint,issue.IssueDesc,dateLogged,issue.Privacy,issue.NoLikes,issue.NoComments,issue.IssueSystemId,image, issue.UserId);
                 }
                 else{
                   var inputs2 = {};
                   var outputs2 = {};
                   inputs2.UserId = issue.UserId;
                   fsi.workflow('GetUserImage', inputs2, outputs2, null, 
                                function(responseData){
                                  image = JSON.parse(responseData.Image).Output[0].Picture;
                                  
                                  addAvatar(issue.UserId,image);
                                  
                                  
                                  AddIssue(issue.Liked,issue.IssueStatus,userImage,issue.SocialHandle,issue.UserPoint,issue.IssueDesc,dateLogged,issue.Privacy,issue.NoLikes,issue.NoComments,issue.IssueSystemId,image, issue.UserId);
                                  
                                },function(errorData){debugger;}); 
                 }
                 
               },
               function(errorData){
                 
               }); 
}

function GetComments(sysId, showTopTen){
  var inputs = {};
  var outputs = {};
  
  inputs.IssueSystemId = sysId; //"7f9eb921-1c6c-48a2-8098-38a10fa2931e";
  inputs.ShowTopTen = showTopTen;
  // alert("SystemID" + " " + sysId);
  debugger;
  //inputs.Bolvalue = false;
  //alert("IssueSystemID" + " " + inputs.IssueSystemId);
  //alert("sysID" + " " + sysId);
  fsi.workflow('GetIssueComments', inputs, outputs, null, 
               function(responseData){
                 
                 debugger;
                 
                 commentData = JSON.parse(responseData.Comments).Output;
                 //alert("commentData" + " " + commentData.length);
                 GenerateCommentCard(0, sysId);
               },
               function(errorData){
                 
               }); 
}

/* function for showing all the comments*/

function showAllComments()
{
  var sysId = fsi.getById('txtSystemId');
  
  
  commentData.length = 0;
  
  $("[data-control-id='pnlComments']").empty();
  GetComments(sysId,false);
  
  
  fsi.hide('btnShowComments');
  
  //Get all comments
  //GetComments(sysId,false);
  
}



function onLoadButton()
{
  
  var loggedUserId = fsi.getLoggedUserId();
  fsi.setById('text-UserId', loggedUserId);
  
  fsi.hide("text-Msg");
  fsi.hide("text-Status");
  fsi.hide("text-NotificationType");
  
  var sys1 = fsi.globalVariable("SYSTEMID");
 // fsi.globalVariable("SYSTEMID",'');
  
  fsi.setById('txtSystemId',sys1);
  var inputs1 = {};
  
  var outputs1 = {};
  

  
  fsi.workflow('GetNotificationCount', inputs1, outputs1, null, 
               function(responseData){
                 
                 debugger;
                 var count = JSON.parse(responseData.Result).Output[0].Count;
                 
                 // Notificstion icon
                 
                 var span = '<span class="bell"><span class="label label-danger counts" onClick="onNotificationClick()">' + count + '</span><i class="glyphicon glyphicon-bell end-user-bell orange" onClick="onNotificationClick()" style="background-image: url()"></i></span>';
                 $('[id=mast-header] .span10 .bell').remove();
                 $('[id=mast-header] .span10').prepend(span);
               },
               function(errorData){
                 
               });
  
  
  // Page Title
  var span2 = '<span class="glyphicon glyphicon-chevron-left back-button" aria-hidden="true" onClick="GoBack()"></span><div class="page-title-comments"></div>';
  removePageTitles();
  $('[id=mast-header]').prepend(span2);
  
  //fsi.setById('txtSystemId', "7f9eb921-1c6c-48a2-8098-38a10fa2931e");
  
  GetIssue(sys1);
  GetComments(sys1,true);
  
  var inputs = {};
  var outputs = {};
  var count;
  
  
    // Getting and setting user status //////
  fsi.workflow('getUserStatus', inputs, outputs, null, 
               function(responseData){
				   
				 var  userstatus = JSON.parse(responseData.UserStatus).Output[0].Status;
                 
				 fsi.globalVariable('userstatus',userstatus);
				   
			   },
               function(errorData){});
  // Setting user status ends. ////////////////
  
  
  
  inputs.Sysid = sys1; //"7f9eb921-1c6c-48a2-8098-38a10fa2931e";
  //alert("System ID"+ "" + sys1);
  fsi.workflow('CommentCountAgainstAnIssue', inputs, outputs, null, 
               function(responseData){
                 
                 debugger;
                 count = JSON.parse(responseData.Result).Output[0].Count;
                 if(count>10)
                 {
                   count = count - 10;
                   fsi.show('btnShowComments');
                 }
                 else
                 {
                   fsi.hide('btnShowComments');
                 }                
                 
                 
                 
                 
               },
               function(errorData){
                 
               }); 
  
  fsi.setById('btnShowComments', 'Show previous ' + count + ' commnets');
}

function clearvalues() {
  
  $("#textareaComment").val('');
  fsi.clearImagePanel('imagepanelComment');
  fsi.changePage('Comment');
  
}

function validationComment()
{
  debugger;
  var cmnt = fsi.getById("textareaComment");
  if(cmnt === "")
  {
    alert("Please enter a comment");
    return false;
  }
  else{return true;}
  
}

function resizeBase64Img(base64, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var deferred = $.Deferred();
    $("<img/>").attr("src", "data:image/gif;base64," + base64).load(function() {
        context.scale(width/this.width,  height/this.height);
        context.drawImage(this, 0, 0); 
        deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));               
    });
    return deferred.promise();    
}

function createCommentFunction(inputs,outputs,systemId){
     fsi.workflow('CommentsFunction1', inputs, outputs, null, 
                 function(responseData){
                   
                   fsi.globalVariable('SYSTEMID',systemId);
                   clearvalues();
                 },
                 function(errorData){
                   alert("workflow error.");
                 });  
}

function createComment(){
  
  
 
  var inputs= {};
  var outputs= {};
  var status= "New";
  var type= "Issue";
  var scialhndle2 = fsi.getById("text-Social");
  var msg = scialhndle2 + " has commented on your issue.";
  var commentDesc= fsi.getById("textareaComment");
  var sys1= fsi.getById('txtSystemId');
  var loggedUserId= fsi.getLoggedUserId();
  
  var base64 = $("[data-control-id=imagepanelComment]").attr('data-image-content').split(',')[1];
    if (base64 !== undefined){
      resizeBase64Img(base64,50,50).then(function(newImg){
        base64 = newImg[0].src.split(',')[1];
    
      // builds the picture data
      var imagePanelData = {};
      imagePanelData.Name = $("[data-control-id=imagepanelComment]").attr('data-image-name');
      imagePanelData.Type = $("[data-control-id=imagepanelComment]").attr('data-image-type');
      imagePanelData.Size = base64.length;
      imagePanelData.Content = base64;
      
      var imagePanelValue = imagePanelData.Name + ',' + imagePanelData.Type + ',' + imagePanelData.Size + ',' + imagePanelData.Content + ',ImagePanel';
      
    
	inputs.Message= msg;
    inputs.CommentDesc = commentDesc;
    inputs.NotificationStatus = status;
    inputs.NotificationType = type;
    inputs.FKIssue = sys1;
    inputs.Image= imagePanelValue;
        
    createCommentFunction(inputs,outputs,sys1);

    });
    }
  else{
    inputs.Message= msg;
    inputs.CommentDesc = commentDesc;
    inputs.NotificationStatus = status;
    inputs.NotificationType = type;
    inputs.FKIssue = sys1;
    inputs.Image= "";
    
    createCommentFunction(inputs,outputs,sys1);
    }

}

