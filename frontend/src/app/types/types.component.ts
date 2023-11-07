import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

const types = [
  ['actionscript', '.as .mxml'],
  ['ada', '.ada .adb .ads'],
  ['asciidoc', '.adoc .ad .asc .asciidoc'],
  ['apl', '.apl'],
  ['asm', '.asm .s'],
  ['asp', '.asp .asa .aspx .asax .ashx .ascx .asmx'],
  ['aspx', '.asp .asa .aspx .asax .ashx .ascx .asmx'],
  ['batch', '.bat .cmd'],
  ['bazel', '.bazel'],
  ['bitbake', '.bb .bbappend .bbclass .inc'],
  ['cc', '.c .h .xs'],
  ['cfmx', '.cfc .cfm .cfml'],
  ['chpl', '.chpl'],
  ['clojure', '.clj .cljs .cljc .cljx .edn'],
  ['coffee', '.coffee .cjsx'],
  ['config', '.config'],
  ['coq', '.coq .g .v'],
  ['cpp', '.cpp .cc .C .cxx .m .hpp .hh .h .H .hxx .tpp'],
  ['crystal', '.cr .ecr'],
  ['csharp', '.cs'],
  ['cshtml', '.cshtml'],
  ['css', '.css'],
  ['cython', '.pyx .pxd .pxi'],
  [
    'delphi',
    '.pas .int .dfm .nfm .dof .dpk .dpr .dproj .groupproj .bdsgroup .bdsproj',
  ],
  ['dlang', '.d .di'],
  ['dot', '.dot .gv'],
  ['dts', '.dts .dtsi'],
  ['ebuild', '.ebuild .eclass'],
  ['elisp', '.el'],
  ['elixir', '.ex .eex .exs'],
  ['elm', '.elm'],
  ['erlang', '.erl .hrl'],
  ['factor', '.factor'],
  ['fortran', '.f .F .f77 .f90 .F90 .f95 .f03 .for .ftn .fpp .FPP'],
  ['fsharp', '.fs .fsi .fsx'],
  ['gettext', '.po .pot .mo'],
  ['glsl', '.vert .tesc .tese .geom .frag .comp'],
  ['go', '.go'],
  ['gradle', '.gradle'],
  ['groovy', '.groovy .gtmpl .gpp .grunit .gradle'],
  ['haml', '.haml'],
  ['handlebars', '.hbs'],
  ['haskell', '.hs .hsig .lhs'],
  ['haxe', '.hx'],
  ['hh', '.h'],
  ['html', '.htm .html .shtml .xhtml'],
  ['idris', '.idr .ipkg .lidr'],
  ['ini', '.ini'],
  ['ipython', '.ipynb'],
  ['isabelle', '.thy'],
  ['j', '.ijs'],
  ['jade', '.jade'],
  ['java', '.java .properties'],
  ['jinja2', '.j2'],
  ['js', '.es6 .js .jsx .vue'],
  ['json', '.json'],
  ['jsp', '.jsp .jspx .jhtm .jhtml .jspf .tag .tagf'],
  ['julia', '.jl'],
  ['kotlin', '.kt'],
  ['less', '.less'],
  ['liquid', '.liquid'],
  ['lisp', '.lisp .lsp'],
  ['log', '.log'],
  ['lua', '.lua'],
  ['m4', '.m4'],
  ['make', '.Makefiles .mk .mak'],
  ['mako', '.mako'],
  ['markdown', '.markdown .mdown .mdwn .mkdn .mkd .md'],
  ['mason', '.mas .mhtml .mpl .mtxt'],
  ['matlab', '.m'],
  ['mathematica', '.m .wl'],
  ['md', '.markdown .mdown .mdwn .mkdn .mkd .md'],
  ['mercury', '.m .moo'],
  ['naccess', '.asa .rsa'],
  ['nim', '.nim'],
  ['nix', '.nix'],
  ['objc', '.m .h'],
  ['objcpp', '.mm .h'],
  ['ocaml', '.ml .mli .mll .mly'],
  ['octave', '.m'],
  ['org', '.org'],
  ['parrot', '.pir .pasm .pmc .ops .pod .pg .tg'],
  ['pdb', '.pdb'],
  ['perl', '.pl .pm .pm6 .pod .t'],
  ['php', '.php .phpt .php3 .php4 .php5 .phtml'],
  ['pike', '.pike .pmod'],
  ['plist', '.plist'],
  ['plone', '.pt .cpt .metadata .cpy .py .xml .zcml'],
  ['powershell', '.ps1'],
  ['proto', '.proto'],
  ['ps1', '.ps1'],
  ['pug', '.pug'],
  ['puppet', '.pp'],
  ['python', '.py'],
  ['qml', '.qml'],
  ['racket', '.rkt .ss .scm'],
  ['rake', '.Rakefile'],
  ['razor', '.cshtml'],
  ['restructuredtext', '.rst'],
  ['rs', '.rs'],
  ['r', '.r .R .Rmd .Rnw .Rtex .Rrst'],
  ['rdoc', '.rdoc'],
  ['ruby', '.rb .rhtml .rjs .rxml .erb .rake .spec'],
  ['rust', '.rs'],
  ['salt', '.sls'],
  ['sass', '.sass .scss'],
  ['scala', '.scala'],
  ['scheme', '.scm .ss'],
  ['shell', '.sh .bash .csh .tcsh .ksh .zsh .fish'],
  ['smalltalk', '.st'],
  ['sml', '.sml .fun .mlb .sig'],
  ['sql', '.sql .ctl'],
  ['stata', '.do .ado'],
  ['stylus', '.styl'],
  ['swift', '.swift'],
  ['tcl', '.tcl .itcl .itk'],
  ['terraform', '.tf .tfvars'],
  ['tex', '.tex .cls .sty'],
  ['thrift', '.thrift'],
  ['tla', '.tla'],
  ['tt', '.tt .tt2 .ttml'],
  ['toml', '.toml'],
  ['ts', '.ts .tsx'],
  ['twig', '.twig'],
  ['vala', '.vala .vapi'],
  ['vb', '.bas .cls .frm .ctl .vb .resx'],
  ['velocity', '.vm .vtl .vsl'],
  ['verilog', '.v .vh .sv .svh'],
  ['vhdl', '.vhd .vhdl'],
  ['vim', '.vim'],
  ['vue', '.vue'],
  ['wix', '.wxi .wxs'],
  ['wsdl', '.wsdl'],
  ['wadl', '.wadl'],
  ['xml', '.xml .dtd .xsl .xslt .xsd .ent .tld .plist .wsdl'],
  ['yaml', '.yaml .yml'],
  ['zeek', '.zeek .bro .bif'],
  ['zephir', '.zep'],
];
@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonSearchbar,
    IonContent,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonIcon,
    CommonModule,
  ],
})
export class TypesComponent implements OnInit {
  @Input()
  selected: string[] | undefined | null = [];
  @Output()
  selectionCancel = new EventEmitter<void>();
  @Output()
  selectionChange = new EventEmitter<string[]>();
  private workingSelectedValues: string[] = [];
  filteredItems: string[][] = [];
  constructor() {
    addIcons({ closeCircle, checkmarkCircle });
  }

  ngOnInit(): void {
    this.filteredItems = [...types];

    if (this.selected) {
      this.workingSelectedValues = [...this.selected];
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((item) => item === value);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter(
        (item) => item !== value
      );
    }
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  trackItems(index: number, item: string[][]) {
    return item[0];
  }

  private filterList(searchQuery: string | undefined) {
    if (searchQuery === undefined) {
      this.filteredItems = [...types];
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    this.filteredItems = types.filter((item) => {
      return (
        item[0].toLowerCase().includes(normalizedQuery) ||
        item[1].toLowerCase().includes(normalizedQuery)
      );
    });
  }
}
