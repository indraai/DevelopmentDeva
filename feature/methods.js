module.exports = {
  /**************
  method: development
  params: packet
  describe: The global service feature that installs with every agent
  ***************/
  development(packet) {
    this.context('feature');
    const development = this.development();
    const data = {};
    return new Promise((resolve, reject) => {
      this.question(`#docs raw feature/development`).then(doc => {
        data.doc = doc.a.data;
        const info = [
          `## Development`,
          `::begin:development:${development.id}`,
          `client: ${development.client_name}`,
          `concerns: ${development.concerns.join(', ')}`,
          `::end:development:${this.hash(development)}`,
        ].join('\n');
        const text = doc.a.text.replace(/::info::/g, info)
        return this.question(`#feecting parse ${text}`)
      }).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: development
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      })
    });
  },
};
