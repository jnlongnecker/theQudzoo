const testCode = "H4sIAAAAAAAACs1W32vbMBB+L/R/EGaPjkm67ifkIXPH6NpBVoduMPog24ctJktGOm14Jf/7Tk6a2HG3rIOWGIzt++5On747Sb49PmIsKHgFP8BYoVXwlgUn0Tg6GZ9GL94EYYunTsi84zAhh/Eaq3TuJFgyf/PfjN2uHhto0dTgg75eXUZxyQ3PEMw7n9FGn13u7w+gNJLbpzYgZDNroUplM4oTCqhDdr0ae7plFrLYSXQGpgocGi5DNnepFNkFNAv9HdRUOSlXHFsyOUdONDbsyPQMH0rtjJIM6G0HoZx3/j7twjhgF0L1HAYy3mHL1csy/G8ZE5ceqIo9ZvtFXLv7pLFW1smnUnCGaETqEOwBirhLbr+Ocy0U2rkzWckt5P0xCZ8VQgpsyP4q7AHvC03G077xXCFIKQpQmaf6so8maEAVWA6RhXZFqcDaIfRFSFnrn2A8hS2y7E6C10kNCslj9Px1H7iCigslVEHguAulNN1ZTdZ+xCN2TtykYBSgyA6xdQbs9veO9PKNJl2TBQkZ0gw6u/3q6rUV86vWtRWbhLvAhohnfAam4vLcr3Du8wa77tfcCN5m8jp0weX24+apSuws6kr8gg1+iJX+A8n9BVf0E7AWumuuAe+x0iaQt6t24G60ouIn90Y9ZnFKrS0kyA3SfnCps7ahDrFAfyH6DyfjTpwf7KOua/6wE9I/bo6Plr8BJxu4zf8JAAA=";
const testCode2 = "H4sIAAAAAAAACs1U72vbMBD9Xuj/IMI+Oibp2tIO8iHLSll/QNqEbjD6QbYPW0yRjHTaMMX/e09xWlsxLOtgJYHg+N67u3dPFz0dHjA2yPkKfoGxQqvBJzY4ikfx0eg4PjkfRGs8cUJmHcKYCKMNttKZk2Ap/MO/M/bUPF6hZVWCT/p+fxPPCm54imA++4o2vnOZ/16C0ki023VCxKbWwiqR1XC2oIQyYg9N70mrLGIzJ9EZmChwaLiM2NwlUqTXUC31T1AT5aRsNK7FZBw5yXhVR6EP+FZpX6hIT17bhGq+8H3ZpXHAroUKCD0bX7C6+VFH/2zjwiV76mKgbLeJG7ovOjccUBvB383FKaIRiUOwe2jktrjdXs61UGjnzqQFt5CFPb3XaEDlWBBwGgXINBdSYEXASQgstcsLBdb2c74qBClFDiqFPvpNSFnq32AIOguhi1z7Rm2s7g7By0UJCokx/HgWAvew4kIJlRM46kIJjTstKRpm/MfNmVUJGAUo0n1cnZ663bsjvX3DcTdkQUKKNEHnxm8+wVoRs+1HTD9CtE3Qbn2k423ggfv/O27SumDdvjy+16EWWltYIDdIS3ajU+6n38fz/YPQv7hyt/J8sytdlvxt165/PB4e1M+X/8VzWAgAAA==";
const mutantAp = 44;
const truekinAp = 38;
export function isVersionOutdated(version) {
  try {
    let parts = version.split('.');
    let currParts = currVersion.split('.');
    console.log(parts);
    console.log(currParts);
    for (let i = 0; i < parts.length - 1; i++) {
      let part = Number(parts[i]);
      let curr = Number(currParts[i]);
      if (part != curr) return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}
const currVersion = '2.0.209.35';
const baseMutant = {
  "gameversion": currVersion,
  "buildversion": "1.0.0",
  "modules": [{
    "moduleType": "XRL.CharacterBuilds.Qud.QudGenotypeModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudGenotypeModuleData, Assembly-CSharp",
      "Genotype": "Mutated Human",
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudSubtypeModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudSubtypeModuleData, Assembly-CSharp",
      "Subtype": "Apostle",
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudMutationsModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudMutationsModuleData, Assembly-CSharp",
      "mp": 12,
      "selections": [],
      "version": "1.1.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudAttributesModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudAttributesModuleData, Assembly-CSharp",
      "PointsPurchased": {
        "Strength": 0,
        "Agility": 0,
        "Toughness": 0,
        "Intelligence": 0,
        "Willpower": 0,
        "Ego": 0
      },
      "apSpent": 0,
      "apRemaining": 44,
      "baseAp": 44,
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModuleData, Assembly-CSharp",
      "StartingLocation": "Joppa",
      "version": "1.0.0"
    }
  }]
};
const baseKin = {
  "gameversion": currVersion,
  "buildversion": "1.0.0",
  "modules": [{
    "moduleType": "XRL.CharacterBuilds.Qud.QudGenotypeModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudGenotypeModuleData, Assembly-CSharp",
      "Genotype": "True Kin",
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudSubtypeModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudSubtypeModuleData, Assembly-CSharp",
      "Subtype": "Horticulturist",
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudAttributesModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudAttributesModuleData, Assembly-CSharp",
      "PointsPurchased": {
        "Strength": 0,
        "Agility": 0,
        "Toughness": 0,
        "Intelligence": 0,
        "Willpower": 0,
        "Ego": 0
      },
      "apSpent": 0,
      "apRemaining": 38,
      "baseAp": 38,
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudCyberneticsModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudCyberneticsModuleData, Assembly-CSharp",
      "lp": -1,
      "selections": [],
      "version": "1.0.0"
    }
  }, {
    "moduleType": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModule, Assembly-CSharp, Version=2.0.209.35, Culture=neutral, PublicKeyToken=null",
    "data": {
      "$type": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModuleData, Assembly-CSharp",
      "StartingLocation": "Joppa",
      "version": "1.0.0"
    }
  }]
};
const go = async function () {
  let json = await fetchJsonForBuildCode(testCode);
  console.log(json);
};
const stringifyForEncoding = function (json) {
  let ret = JSON.stringify(json, null, 2);
  ret = ret.replace(/\n/g, "\r\n");
  return encodeURIComponent(ret);
};
const fetchJsonForBuildCode = async function (buildCode) {
  if (!buildCode) return;
  let req = new Request(`/api/codes/parse/` + encodeURIComponent(buildCode));
  let response = await fetch(req);
  if (!response.ok) {
    console.log(await response.text());
    return;
  }
  return await response.json();
};
const fetchBuildCodeForPayload = async function (payload) {
  let template;
  if (payload.genotype == "True Kin") {
    template = JSON.parse(JSON.stringify(baseKin));
    template.modules[2].data.PointsPurchased = payload.pointSpread;
    template.modules[2].data.apRemaining = truekinAp - payload.apSpent;
    template.modules[2].data.apSpent = 0 - payload.apSpent;
    template.modules[2].data.baseAp = truekinAp;
    template.modules[3].data.selections = payload.cybernetics;
  } else {
    template = JSON.parse(JSON.stringify(baseMutant));
    template.modules[2].data.mp = payload.mpRemaining;
    template.modules[2].data.selections = payload.mutations;
    template.modules[3].data.PointsPurchased = payload.pointSpread;
    template.modules[3].data.apSpent = 0 - payload.apSpent;
    template.modules[3].data.apRemaining = mutantAp - payload.apSpent;
    template.modules[3].data.baseAp = mutantAp;
  }
  template.modules[0].data.Genotype = payload.genotype;
  template.modules[1].data.Subtype = payload.subtype;
  template.modules[4].data.name = payload.name ? payload.name : null;
  return await fetchBuildCodeForJson(template);
};
const fetchBuildCodeForJson = async function (json) {
  let req = new Request(`/api/codes/serialize/` + stringifyForEncoding(json));
  let response = await fetch(req);
  if (!response.ok) {
    console.log(await response.text());
    return;
  }
  let text = await response.text();
  return text.substring(1, text.length - 1);
};
export { fetchJsonForBuildCode, fetchBuildCodeForJson, fetchBuildCodeForPayload };