import {parse} from '@babel/parser';
import types from '@babel/types';
import _traverse from "@babel/traverse";
import _generate from '@babel/generator'
import _template from '@babel/template'
const traverse = _traverse.default;
const generate = _generate.default;
const template = _template.default;


const input = `
function add(a, b) {
  console.log(a + b);
}
debugger;
console.log(add(2, 4));
`;
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
const ast = parse(input, {
  sourceType: 'script',
})
// console.log(ast);

const traverseRes = traverse(ast, {
  Identifier(path) {
    //标识符
    if (path.node.name === 'add') {
      path.node.name = "add3";
    }
  },
  DebuggerStatement(path) {
    //删除debugger
    path.remove();
  },
  CallExpression(path) {
    if (path.node.isNew) {
      //新节点跳过
      return;
    }
    //函数调用
    const expressionStr = path.get('callee').toString()
    if(targetCalleeName.includes(expressionStr)){
      // path.remove();//删除console.log
      console.log('path.node.loc',path.node.loc)
      const { line, column } = path.node.loc.start;
      const newNode = template.expression(`console.log(${line},${column})`)()
      newNode.isNew = true;
      path.insertBefore(newNode);
      // path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`));

    }

  },
  enter(path) {
    // if(path.node.type === 'Identifier' && path.node.name === 'add') {
    //   path.node.name = 'add2';
    // }
    // ttype.identifier('subtract');

    // console.log(path.node,path)
  },
  exit(path) {
  }
})
console.log('traverseRes',traverseRes);

const outputCode = generate(ast, {}).code;
console.log('outputCode',outputCode);


