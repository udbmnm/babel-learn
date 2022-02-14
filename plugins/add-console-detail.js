const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

export  default function({types, template}) {
  return {
      visitor: {
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
      }
  }
}