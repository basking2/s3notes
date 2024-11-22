const aceModes = {}

/*
aceModes['abap'] = require('ace-builds/src-noconflict/mode-abap').Mode
aceModes['haxe'] = require('ace-builds/src-noconflict/mode-haxe').Mode
aceModes['prisma'] = require('ace-builds/src-noconflict/mode-prisma').Mode
aceModes['abc'] = require('ace-builds/src-noconflict/mode-abc').Mode
aceModes['hjson'] = require('ace-builds/src-noconflict/mode-hjson').Mode
aceModes['prolog'] = require('ace-builds/src-noconflict/mode-prolog').Mode
aceModes['actionscript'] = require('ace-builds/src-noconflict/mode-actionscript').Mode
aceModes['html_elixir'] = require('ace-builds/src-noconflict/mode-html_elixir').Mode
aceModes['properties'] = require('ace-builds/src-noconflict/mode-properties').Mode
aceModes['ada'] = require('ace-builds/src-noconflict/mode-ada').Mode
*/
aceModes['HTML'] = require('ace-builds/src-noconflict/mode-html').Mode
/*
aceModes['protobuf'] = require('ace-builds/src-noconflict/mode-protobuf').Mode
aceModes['alda'] = require('ace-builds/src-noconflict/mode-alda').Mode
aceModes['html_ruby'] = require('ace-builds/src-noconflict/mode-html_ruby').Mode
aceModes['prql'] = require('ace-builds/src-noconflict/mode-prql').Mode
aceModes['apache_conf'] = require('ace-builds/src-noconflict/mode-apache_conf').Mode
aceModes['ini'] = require('ace-builds/src-noconflict/mode-ini').Mode
aceModes['puppet'] = require('ace-builds/src-noconflict/mode-puppet').Mode
aceModes['apex'] = require('ace-builds/src-noconflict/mode-apex').Mode
aceModes['io'] = require('ace-builds/src-noconflict/mode-io').Mode
aceModes['python'] = require('ace-builds/src-noconflict/mode-python').Mode
aceModes['applescript'] = require('ace-builds/src-noconflict/mode-applescript').Mode
aceModes['ion'] = require('ace-builds/src-noconflict/mode-ion').Mode
aceModes['qml'] = require('ace-builds/src-noconflict/mode-qml').Mode
aceModes['aql'] = require('ace-builds/src-noconflict/mode-aql').Mode
aceModes['jack'] = require('ace-builds/src-noconflict/mode-jack').Mode
aceModes['raku'] = require('ace-builds/src-noconflict/mode-raku').Mode
*/
aceModes['Asciidoc'] = require('ace-builds/src-noconflict/mode-asciidoc').Mode
/*
aceModes['jade'] = require('ace-builds/src-noconflict/mode-jade').Mode
aceModes['razor'] = require('ace-builds/src-noconflict/mode-razor').Mode
aceModes['asl'] = require('ace-builds/src-noconflict/mode-asl').Mode
aceModes['java'] = require('ace-builds/src-noconflict/mode-java').Mode
aceModes['rdoc'] = require('ace-builds/src-noconflict/mode-rdoc').Mode
aceModes['assembly_arm32'] = require('ace-builds/src-noconflict/mode-assembly_arm32').Mode
aceModes['javascript'] = require('ace-builds/src-noconflict/mode-javascript').Mode
aceModes['red'] = require('ace-builds/src-noconflict/mode-red').Mode
aceModes['assembly_x86'] = require('ace-builds/src-noconflict/mode-assembly_x86').Mode
aceModes['jexl'] = require('ace-builds/src-noconflict/mode-jexl').Mode
aceModes['redshift'] = require('ace-builds/src-noconflict/mode-redshift').Mode
aceModes['astro'] = require('ace-builds/src-noconflict/mode-astro').Mode
*/
aceModes['JSON'] = require('ace-builds/src-noconflict/mode-json5').Mode
/*
aceModes['rhtml'] = require('ace-builds/src-noconflict/mode-rhtml').Mode
aceModes['autohotkey'] = require('ace-builds/src-noconflict/mode-autohotkey').Mode
aceModes['jsoniq'] = require('ace-builds/src-noconflict/mode-jsoniq').Mode
aceModes['-r'] = require('ace-builds/src-noconflict/mode-r').Mode
aceModes['batchfile'] = require('ace-builds/src-noconflict/mode-batchfile').Mode
aceModes['json'] = require('ace-builds/src-noconflict/mode-json').Mode
aceModes['robot'] = require('ace-builds/src-noconflict/mode-robot').Mode
aceModes['bibtex'] = require('ace-builds/src-noconflict/mode-bibtex').Mode
aceModes['jsp'] = require('ace-builds/src-noconflict/mode-jsp').Mode
aceModes['rst'] = require('ace-builds/src-noconflict/mode-rst').Mode
aceModes['c9search'] = require('ace-builds/src-noconflict/mode-c9search').Mode
aceModes['jssm'] = require('ace-builds/src-noconflict/mode-jssm').Mode
aceModes['ruby'] = require('ace-builds/src-noconflict/mode-ruby').Mode
aceModes['c_cpp'] = require('ace-builds/src-noconflict/mode-c_cpp').Mode
aceModes['jsx'] = require('ace-builds/src-noconflict/mode-jsx').Mode
aceModes['rust'] = require('ace-builds/src-noconflict/mode-rust').Mode
aceModes['cirru'] = require('ace-builds/src-noconflict/mode-cirru').Mode
aceModes['julia'] = require('ace-builds/src-noconflict/mode-julia').Mode
aceModes['sac'] = require('ace-builds/src-noconflict/mode-sac').Mode
aceModes['clojure'] = require('ace-builds/src-noconflict/mode-clojure').Mode
aceModes['kotlin'] = require('ace-builds/src-noconflict/mode-kotlin').Mode
aceModes['sass'] = require('ace-builds/src-noconflict/mode-sass').Mode
aceModes['cobol'] = require('ace-builds/src-noconflict/mode-cobol').Mode
aceModes['latex'] = require('ace-builds/src-noconflict/mode-latex').Mode
aceModes['scad'] = require('ace-builds/src-noconflict/mode-scad').Mode
aceModes['coffee'] = require('ace-builds/src-noconflict/mode-coffee').Mode
aceModes['latte'] = require('ace-builds/src-noconflict/mode-latte').Mode
aceModes['scala'] = require('ace-builds/src-noconflict/mode-scala').Mode
aceModes['coldfusion'] = require('ace-builds/src-noconflict/mode-coldfusion').Mode
aceModes['less'] = require('ace-builds/src-noconflict/mode-less').Mode
aceModes['scheme'] = require('ace-builds/src-noconflict/mode-scheme').Mode
aceModes['crystal'] = require('ace-builds/src-noconflict/mode-crystal').Mode
aceModes['liquid'] = require('ace-builds/src-noconflict/mode-liquid').Mode
aceModes['scrypt'] = require('ace-builds/src-noconflict/mode-scrypt').Mode
aceModes['csharp'] = require('ace-builds/src-noconflict/mode-csharp').Mode
aceModes['lisp'] = require('ace-builds/src-noconflict/mode-lisp').Mode
aceModes['scss'] = require('ace-builds/src-noconflict/mode-scss').Mode
aceModes['csound_document'] = require('ace-builds/src-noconflict/mode-csound_document').Mode
aceModes['livescript'] = require('ace-builds/src-noconflict/mode-livescript').Mode
aceModes['sh'] = require('ace-builds/src-noconflict/mode-sh').Mode
aceModes['csound_orchestra'] = require('ace-builds/src-noconflict/mode-csound_orchestra').Mode
aceModes['logiql'] = require('ace-builds/src-noconflict/mode-logiql').Mode
aceModes['sjs'] = require('ace-builds/src-noconflict/mode-sjs').Mode
aceModes['csound_score'] = require('ace-builds/src-noconflict/mode-csound_score').Mode
aceModes['logtalk'] = require('ace-builds/src-noconflict/mode-logtalk').Mode
aceModes['slim'] = require('ace-builds/src-noconflict/mode-slim').Mode
aceModes['csp'] = require('ace-builds/src-noconflict/mode-csp').Mode
aceModes['lsl'] = require('ace-builds/src-noconflict/mode-lsl').Mode
aceModes['smarty'] = require('ace-builds/src-noconflict/mode-smarty').Mode
aceModes['css'] = require('ace-builds/src-noconflict/mode-css').Mode
aceModes['lua'] = require('ace-builds/src-noconflict/mode-lua').Mode
aceModes['smithy'] = require('ace-builds/src-noconflict/mode-smithy').Mode
aceModes['curly'] = require('ace-builds/src-noconflict/mode-curly').Mode
aceModes['luapage'] = require('ace-builds/src-noconflict/mode-luapage').Mode
aceModes['snippets'] = require('ace-builds/src-noconflict/mode-snippets').Mode
aceModes['cuttlefish'] = require('ace-builds/src-noconflict/mode-cuttlefish').Mode
aceModes['lucene'] = require('ace-builds/src-noconflict/mode-lucene').Mode
aceModes['soy_template'] = require('ace-builds/src-noconflict/mode-soy_template').Mode
aceModes['dart'] = require('ace-builds/src-noconflict/mode-dart').Mode
aceModes['makefile'] = require('ace-builds/src-noconflict/mode-makefile').Mode
aceModes['space'] = require('ace-builds/src-noconflict/mode-space').Mode
aceModes['diff'] = require('ace-builds/src-noconflict/mode-diff').Mode
*/
aceModes['Markdown'] = require('ace-builds/src-noconflict/mode-markdown').Mode
/*
aceModes['sparql'] = require('ace-builds/src-noconflict/mode-sparql').Mode
aceModes['django'] = require('ace-builds/src-noconflict/mode-django').Mode
aceModes['mask'] = require('ace-builds/src-noconflict/mode-mask').Mode
aceModes['sql'] = require('ace-builds/src-noconflict/mode-sql').Mode
aceModes['-d'] = require('ace-builds/src-noconflict/mode-d').Mode
aceModes['matlab'] = require('ace-builds/src-noconflict/mode-matlab').Mode
aceModes['sqlserver'] = require('ace-builds/src-noconflict/mode-sqlserver').Mode
aceModes['dockerfile'] = require('ace-builds/src-noconflict/mode-dockerfile').Mode
aceModes['maze'] = require('ace-builds/src-noconflict/mode-maze').Mode
aceModes['stylus'] = require('ace-builds/src-noconflict/mode-stylus').Mode
aceModes['dot'] = require('ace-builds/src-noconflict/mode-dot').Mode
aceModes['mediawiki'] = require('ace-builds/src-noconflict/mode-mediawiki').Mode
aceModes['svg'] = require('ace-builds/src-noconflict/mode-svg').Mode
aceModes['drools'] = require('ace-builds/src-noconflict/mode-drools').Mode
aceModes['mel'] = require('ace-builds/src-noconflict/mode-mel').Mode
aceModes['swift'] = require('ace-builds/src-noconflict/mode-swift').Mode
aceModes['edifact'] = require('ace-builds/src-noconflict/mode-edifact').Mode
aceModes['mips'] = require('ace-builds/src-noconflict/mode-mips').Mode
aceModes['tcl'] = require('ace-builds/src-noconflict/mode-tcl').Mode
aceModes['eiffel'] = require('ace-builds/src-noconflict/mode-eiffel').Mode
aceModes['mixal'] = require('ace-builds/src-noconflict/mode-mixal').Mode
aceModes['terraform'] = require('ace-builds/src-noconflict/mode-terraform').Mode
aceModes['ejs'] = require('ace-builds/src-noconflict/mode-ejs').Mode
aceModes['mushcode'] = require('ace-builds/src-noconflict/mode-mushcode').Mode
aceModes['tex'] = require('ace-builds/src-noconflict/mode-tex').Mode
aceModes['elixir'] = require('ace-builds/src-noconflict/mode-elixir').Mode
aceModes['mysql'] = require('ace-builds/src-noconflict/mode-mysql').Mode
aceModes['textile'] = require('ace-builds/src-noconflict/mode-textile').Mode
aceModes['elm'] = require('ace-builds/src-noconflict/mode-elm').Mode
aceModes['nasal'] = require('ace-builds/src-noconflict/mode-nasal').Mode
*/
aceModes['Text'] = require('ace-builds/src-noconflict/mode-text').Mode
/*
aceModes['erlang'] = require('ace-builds/src-noconflict/mode-erlang').Mode
aceModes['nginx'] = require('ace-builds/src-noconflict/mode-nginx').Mode
aceModes['toml'] = require('ace-builds/src-noconflict/mode-toml').Mode
aceModes['flix'] = require('ace-builds/src-noconflict/mode-flix').Mode
aceModes['nim'] = require('ace-builds/src-noconflict/mode-nim').Mode
aceModes['tsx'] = require('ace-builds/src-noconflict/mode-tsx').Mode
aceModes['forth'] = require('ace-builds/src-noconflict/mode-forth').Mode
aceModes['nix'] = require('ace-builds/src-noconflict/mode-nix').Mode
aceModes['turtle'] = require('ace-builds/src-noconflict/mode-turtle').Mode
aceModes['fortran'] = require('ace-builds/src-noconflict/mode-fortran').Mode
aceModes['nsis'] = require('ace-builds/src-noconflict/mode-nsis').Mode
aceModes['twig'] = require('ace-builds/src-noconflict/mode-twig').Mode
aceModes['fsharp'] = require('ace-builds/src-noconflict/mode-fsharp').Mode
aceModes['nunjucks'] = require('ace-builds/src-noconflict/mode-nunjucks').Mode
aceModes['typescript'] = require('ace-builds/src-noconflict/mode-typescript').Mode
aceModes['fsl'] = require('ace-builds/src-noconflict/mode-fsl').Mode
aceModes['objectivec'] = require('ace-builds/src-noconflict/mode-objectivec').Mode
aceModes['vala'] = require('ace-builds/src-noconflict/mode-vala').Mode
aceModes['ftl'] = require('ace-builds/src-noconflict/mode-ftl').Mode
aceModes['ocaml'] = require('ace-builds/src-noconflict/mode-ocaml').Mode
aceModes['vbscript'] = require('ace-builds/src-noconflict/mode-vbscript').Mode
aceModes['gcode'] = require('ace-builds/src-noconflict/mode-gcode').Mode
aceModes['odin'] = require('ace-builds/src-noconflict/mode-odin').Mode
aceModes['velocity'] = require('ace-builds/src-noconflict/mode-velocity').Mode
aceModes['gherkin'] = require('ace-builds/src-noconflict/mode-gherkin').Mode
aceModes['partiql'] = require('ace-builds/src-noconflict/mode-partiql').Mode
aceModes['verilog'] = require('ace-builds/src-noconflict/mode-verilog').Mode
aceModes['gitignore'] = require('ace-builds/src-noconflict/mode-gitignore').Mode
aceModes['pascal'] = require('ace-builds/src-noconflict/mode-pascal').Mode
aceModes['vhdl'] = require('ace-builds/src-noconflict/mode-vhdl').Mode
aceModes['glsl'] = require('ace-builds/src-noconflict/mode-glsl').Mode
aceModes['perl'] = require('ace-builds/src-noconflict/mode-perl').Mode
aceModes['visualforce'] = require('ace-builds/src-noconflict/mode-visualforce').Mode
aceModes['gobstones'] = require('ace-builds/src-noconflict/mode-gobstones').Mode
aceModes['pgsql'] = require('ace-builds/src-noconflict/mode-pgsql').Mode
aceModes['vue'] = require('ace-builds/src-noconflict/mode-vue').Mode
aceModes['golang'] = require('ace-builds/src-noconflict/mode-golang').Mode
aceModes['php'] = require('ace-builds/src-noconflict/mode-php').Mode
aceModes['wollok'] = require('ace-builds/src-noconflict/mode-wollok').Mode
aceModes['graphqlschema'] = require('ace-builds/src-noconflict/mode-graphqlschema').Mode
aceModes['php_laravel_blade'] = require('ace-builds/src-noconflict/mode-php_laravel_blade').Mode
aceModes['xml'] = require('ace-builds/src-noconflict/mode-xml').Mode
aceModes['groovy'] = require('ace-builds/src-noconflict/mode-groovy')
aceModes['pig'] = require('ace-builds/src-noconflict/mode-pig').Mode
aceModes['xquery'] = require('ace-builds/src-noconflict/mode-xquery').Mode
aceModes['haml'] = require('ace-builds/src-noconflict/mode-haml').Mode
aceModes['plain_text'] = require('ace-builds/src-noconflict/mode-plain_text').Mode
aceModes['yaml'] = require('ace-builds/src-noconflict/mode-yaml').Mode
aceModes['handlebars'] = require('ace-builds/src-noconflict/mode-handlebars').Mode
aceModes['plsql'] = require('ace-builds/src-noconflict/mode-plsql').Mode
aceModes['zeek'] = require('ace-builds/src-noconflict/mode-zeek').Mode
aceModes['haskell_cabal'] = require('ace-builds/src-noconflict/mode-haskell_cabal').Mode
aceModes['powershell'] = require('ace-builds/src-noconflict/mode-powershell').Mode
aceModes['zig'] = require('ace-builds/src-noconflict/mode-zig').Mode
aceModes['haskell'] = require('ace-builds/src-noconflict/mode-haskell').Mode
aceModes['praat'] = require('ace-builds/src-noconflict/mode-praat').Mode
*/


module.exports = aceModes