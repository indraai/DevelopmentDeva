// Copyright (c)2023 Quinn Michaels
// Security Deva


const fs = require('fs');
const path = require('path');

const package = require('./package.json');
const info = {
  id: package.id,
  name: package.name,
  describe: package.description,
  version: package.version,
  url: package.homepage,
  dir: __dirname,
  git: package.repository.url,
  bugs: package.bugs.url,
  author: package.author,
  license: package.license,
  copyright: package.copyright,
};

const data_path = path.join(__dirname, 'data.json');
const {agent,vars} = require(data_path).DATA;

const Deva = require('@indra.ai/deva');
const DEVELOPMENT = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();},
  },
  listeners: {},
  modules: {},
  deva: {},
  func: {
    dev_question(packet) {return;},
    dev_answer(packet) {return;},
  },
  methods: {
    /**************
    method: issue
    params: packet
    describe: create a new issue for the main deva.world through github agent.
    ***************/
    issue(packet) {
      const agent = this.agent();
      return new Promise((resolve, reject) => {
        this.question(`#github issue:${agent.key} ${packet.q.text}`).then(issue => {
          return resolve({
            text: issue.a.text,
            html: issue.a.html,
            data: issue.a.data,
          })
        }).catch(err => {
          return this.error(err, packet, reject);
        });
      });
    },

    /**************
    method: uid
    params: packet
    describe: Return a system id to the user from the :name:.
    ***************/
    uid(packet) {
      return Promise.resolve(this.uid());
    },

    /**************
    method: status
    params: packet
    describe: Return the current status of the :name:.
    ***************/
    status(packet) {
      return Promise.resolve(this.status());
    },

    /**************
    method: help
    params: packet
    describe: The Help method returns the information on how to use the :name:.
    ***************/
    help(packet) {
      return new Promise((resolve, reject) => {
        this.help(packet.q.text, __dirname).then(help => {
          return this.question(`#feecting parse ${help}`);
        }).then(parsed => {
          return resolve({
            text: parsed.a.text,
            html: parsed.a.html,
            data: parsed.a.data,
          });
        }).catch(reject);
      });
    }
  },
  onDone(data) {
    this.listen('devacore:question', packet => {
      if (packet.q.text.includes(this.vars.trigger)) return; this.func.dev_question(packet);
    });
    this.listen('devacore:answer', packet => {
      if (packet.a.text.includes(this.vars.trigger)) return; this.func.dev_answer(packet);
    });
    return Promise.resolve(data);
  },
});
module.exports = DEVELOPMENT
