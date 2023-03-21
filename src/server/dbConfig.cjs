const dbs = require("./dbs.cjs");
const codeManager = require("./buildCodes.cjs");

run();

async function run() {
    dbs.dbConnect();
    await todo();
    dbs.disconnect();
}

async function todo() {
    await setGenotype();
    await setBuildTimes();
}

async function setBuildTimes() {
    let result = await dbs.getBuilds({ params: { info: null }, session: { user: '' } }, { status: () => { } });
    let builds = result.builds;

    for (let build of builds) {
        build['owner'] = undefined;
        build['created'] = Date.now();
        build['updated'] = Date.now();
        await dbs.updateBuild({ body: build }, { status: () => { } });
    }
}

async function setGenotype() {
    let result = await dbs.getBuilds({ params: { info: null }, session: { user: '' } }, { status: () => { } });
    let builds = result.builds;

    for (let build of builds) {
        build['owner'] = undefined;
        let result = codeManager.codeToJSON(build.code);
        console.log(result.modules[0].data.Genotype);
        build['genotype'] = result.modules[0].data.Genotype == 'True Kin' ? 'True Kin' : 'Mutated Human';
        await dbs.updateBuild({ body: build }, { status: () => { } });
    }
}
