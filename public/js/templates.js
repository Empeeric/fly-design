(function(){dust.register("article",body_0);function body_0(chk,ctx){return chk.section(ctx.get(["items"], false),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("\r\n").write("<article id=\"").reference(ctx.get(["index"], false),ctx,"h").write("\" class=\"").exists(ctx.get(["left"], false),ctx,{"block":body_2},null).write("\">").write("\r\n    ").write("<section class=\"title\">").write("\r\n        ").write("<header>").reference(ctx.get(["name"], false),ctx,"h").write("</header>").write("\r\n        ").write("<p>").write("\r\n            ").reference(ctx.get(["description"], false),ctx,"h").write("\r\n            ").write("<i class=\"icon-left-dir\"></i>").write("\r\n        ").write("</p>").write("\r\n        ").write("<i class=\"icon-left-dir big\"></i>").write("\r\n        ").write("<a href=\"#\" class=\"icon-close\"></a>").write("\r\n    ").write("</section>").write("\r\n    ").write("<div class=\"content cf\">").write("\r\n        ").write("<div class=\"slider\">").write("\r\n            ").write("<ul>").write("\r\n                ").section(ctx.get(["slides"], false),ctx,{"block":body_3},null).write("\r\n            ").write("</ul>").write("\r\n        ").write("</div>").write("\r\n        ").write("<div class=\"inner\">").write("\r\n            ").reference(ctx.get(["text"], false),ctx,"h",["s"]).write("\r\n        ").write("</div>").write("\r\n    ").write("</div>").write("\r\n").write("</article>").write("\r\n");}function body_2(chk,ctx){return chk.write("left");}function body_3(chk,ctx){return chk.write("\r\n                    ").write("<li><img src=\"").reference(ctx.getPath(false, ["picture","url"]),ctx,"h").write("/convert?w=649&h=398&fit=crop\"/></li>").write("\r\n                ");}return body_0;})();(function(){dust.register("thumb",body_0);function body_0(chk,ctx){return chk.section(ctx.get(["items"], false),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("\r\n").write("<a class=\"thumb ").exists(ctx.get(["last"], false),ctx,{"block":body_2},null).write("\" href=\"#").reference(ctx.get(["index"], false),ctx,"h").write("\" >").write("\r\n    ").write("<img src=\"").reference(ctx.getPath(false, ["picture","url"]),ctx,"h").write("/convert?w=300&h=170&fit=crop\" alt=\"CLIENT\" />").write("\r\n    ").write("<header>").write("\r\n        ").reference(ctx.get(["name"], false),ctx,"h").write("\r\n        ").write("<i class=\"icon-left-dir\"></i>").write("\r\n    ").write("</header>").write("\r\n").write("</a>").write("\r\n");}function body_2(chk,ctx){return chk.write("last");}return body_0;})();