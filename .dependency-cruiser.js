/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
   forbidden: [
      {
         name: 'no-circular',
         severity: 'warn',
         from: {},
         to: {
            circular: true
         }
      },
      {
         name: 'no-orphans',
         severity: 'warn',
         from: {
            orphan: true,
            pathNot: [
               '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$',
               '\\.d\\.ts$',
               '(^|/)tsconfig\\.json$',
               '(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$'
            ]
         },
         to: {}
      },
      {
         name: 'no-deprecated-core',
         severity: 'warn',
         from: {},
         to: {
            dependencyTypes: [ 'core' ],
            path: [
               '^(v8/tools/codemap)$',
               '^(v8/tools/consarray)$',
               '^(v8/tools/csvparser)$',
               '^(v8/tools/logreader)$',
               '^(v8/tools/profile_view)$',
               '^(v8/tools/profile)$',
               '^(v8/tools/SourceMap)$',
               '^(v8/tools/splaytree)$',
               '^(v8/tools/tickprocessor-driver)$',
               '^(v8/tools/tickprocessor)$',
               '^(node-inspect/lib/_inspect)$',
               '^(node-inspect/lib/internal/inspect_client)$',
               '^(node-inspect/lib/internal/inspect_repl)$',
               '^(async_hooks)$',
               '^(punycode)$',
               '^(domain)$',
               '^(constants)$',
               '^(sys)$',
               '^(_linklist)$',
               '^(_stream_wrap)$'
            ]
         }
      },
      {
         name: 'not-to-deprecated',
         severity: 'warn',
         from: {},
         to: {
            dependencyTypes: [ 'deprecated' ]
         }
      },
      {
         name: 'no-non-package-json',
         severity: 'error',
         from: {},
         to: {
            dependencyTypes: [ 'npm-no-pkg', 'npm-unknown' ]
         }
      },
      {
         name: 'not-to-unresolvable',
         severity: 'error',
         from: {},
         to: {
            couldNotResolve: true
         }
      },
      {
         name: 'no-duplicate-dep-types',
         severity: 'warn',
         from: {},
         to: {
            moreThanOneDependencyType: true,
            dependencyTypesNot: [ 'type-only' ]
         }
      },
      {
         name: 'not-to-spec',
         severity: 'error',
         from: {},
         to: {
            path: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$'
         }
      },
      {
         name: 'not-to-dev-dep',
         severity: 'error',
         from: {
            path: '^(code)',
            pathNot: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$'
         },
         to: {
            dependencyTypes: [ 'npm-dev' ]
         }
      },
      {
         name: 'optional-deps-used',
         severity: 'info',
         from: {},
         to: {
            dependencyTypes: [ 'npm-optional' ]
         }
      },
      {
         name: 'peer-deps-used',
         severity: 'warn',
         from: {},
         to: {
            dependencyTypes: [ 'npm-peer' ]
         }
      }
   ],
   options: {
      doNotFollow: {
         path: 'node_modules'
      },
      includeOnly: '^code',
      exclude: {
         path: [ 'global.ts' ]
      },
      tsConfig: {
         fileName: 'tsconfig.json'
      },
      enhancedResolveOptions: {
         exportsFields: [ 'exports' ],
         conditionNames: [ 'import', 'require', 'node', 'default' ]
      },
      reporterOptions: {
         dot: {
            theme: {
               graph: {
                  newrank: true,
                  rankdir: 'TB',
                  splines: 'ortho',
                  overlap: 'false',
                  nodesep: '0.02',
                  ranksep: '0.4',
                  fontname: 'Determination Mono Web',
                  fontsize: '9',
                  style: 'rounded,bold,filled',
                  fillcolor: '#ffffff',
                  compound: 'false'
               },
               node: {
                  shape: 'box',
                  style: 'rounded,filled',
                  height: '0.3',
                  color: 'black',
                  fillcolor: '#ffffcc',
                  fontcolor: 'black',
                  fontname: 'Determination Mono Web',
                  fontsize: 9
               },
               edge: {
                  arrowhead: 'normal',
                  arrowsize: '0.3',
                  penwidth: '0.5',
                  color: '#002200',
                  fontname: 'Determination Mono Web',
                  fontsize: '7'
               }
            }
         }
      }
   }
};
