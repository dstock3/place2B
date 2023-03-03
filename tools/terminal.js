const { Terminal } = require('xterm');
const { FitAddon } = require('xterm-addon-fit');
const { spawn } = require('node-pty');

class MyTerminal {
  constructor() {
    this.lines = [];
    this.term = new Terminal();
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.open(document.querySelector('.terminal-display'));
    this.term.write('\r\n');
    this.spawnShell();
  }

  spawnShell() {
    const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
    const ptyProcess = spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.cwd(),
      env: process.env
    });

    ptyProcess.on('data', (data) => {
      const lines = data.toString().split('\r\n');
      lines.forEach((line) => {
        this.lines.push(line);
        this.term.writeln(line);
      });
    });

    this.term.onData((data) => {
      ptyProcess.write(data);
    });
  }
}

  
module.exports = MyTerminal;