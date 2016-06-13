 window.onload=function(){
          var canvas=document.getElementsByTagName("canvas")[0];
          var copy=document.getElementsByClassName("copy")[0];
          var xpc=document.getElementById("xp");
          var xp=document.getElementsByClassName("xp")[0];
          xp.style.display="none";
          var cobj=canvas.getContext("2d");

            $(".one").hover(function(){
                $(this).find(".son").finish();
                $(this).find(".son").slideDown(150);
            },function(){
                $(this).find(".son").finish();
                $(this).find(".son").slideUp(150);
            });



            // 操作界面
             var shapes=new shape(cobj,canvas,copy);
             //xpc
            $(xpc).click(function(){
                shapes.xpsize=prompt("请输入橡皮擦大小")         
                shapes.xp(xp)
            })
             //文件
             $(".parent:eq(0)").find(".option").click(function(){
                xp.style.display="none";
                copy.onmousemove=null
                shapes.wenjian=$(this).attr("data-role"); 
                shapes.caozuo();
             })
             //画图
             $(".parent:eq(1)").find(".option").click(function(){
                 
                 xp.style.display="none";
                 copy.onmousemove=null
                 shapes.type=$(this).attr("data-role");
                 shapes.draw();
             }
             )

             //方式
            $(".parent:eq(2)").find(".option").click(function(){
                        xp.style.display="none";
                        copy.onmousemove=null
                        shapes.style=$(this).attr("data-role");
                        shapes.draw();
                    }
            )

            /*填充的颜色*/

            $(".parent:eq(4)").find("input").change(function(){
                xp.style.display="none";
                copy.onmousemove=null
                shapes.fillStyle=$(this).val();
                shapes.draw();
                    }
            )

            /*线条的颜色*/

            $(".parent:eq(5)").find("input").change(function(){
                        xp.style.display="none";
                        copy.onmousemove=null
                        shapes.strokeStyle=$(this).val();
                        shapes.draw();
                    }
            )

            /*线条的宽度*/
            $(".parent:eq(3)").find(".option").click(function(){
                xp.style.display="none";
                copy.onmousemove=null
                shapes.lineWidth=$(this).attr("data-role");
                shapes.draw();

                    }
            )
            /*返回*/
                var button=document.getElementById('back')
                shapes.back(button,xp);
             /*选择多边形边数*/
             $(".bb").click(function(){
                shapes.biannum=prompt("请输入边数");
                 shapes.draw();
             })
             /*选择多角形角数*/
             $(".ang").click(function(){
                 shapes.jiaonum=prompt("请输入角数");
                 shapes.draw();
             })
        
 }