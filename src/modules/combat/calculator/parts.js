export class Part {
    host

    onAttach(host) {
        if (!host) console.error('No host supplied.');
        this.host = host;
    }
}