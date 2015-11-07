var os = require('os'),
	fs = require('fs'),
	childProcess =  require('child_process'),
	javac = function(){
			childProcess.exec('javac ./Proc.java',function(err,stdout,stderr){
				console.info('out:' + stdout);
				if (!err) {
					childProcess.exec('java ./Proc');
				}
			});
		};
		

process.stdin.setEncoding('utf8');

var stdinBuffer = [];
var importDummy = '/*IMPORT DUMMY*/'
	codeDummy = '/*DUMMY*/',
	javatemplate = importDummy + 'public class Proc {public static void main(String[] args) {'+codeDummy+'}}',
	finalJava = '';
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
  	 chunk = chunk.replace(os.EOL,'')
     if (chunk == ':show') {
     	stdinBuffer.forEach(function(d){
     		process.stdout.write(finalJava);
     	});
     } else {
     	stdinBuffer.push(chunk);
 		finalJava = javatemplate.replace(codeDummy,stdinBuffer.join(';') + ';');
 		process.stdout.write(finalJava+os.EOL);
 		fs.writeFileSync('./Proc.java',finalJava,'utf8');
 		javac();
     }
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});