import { LightningElement } from "lwc";

export default class CodesTest extends LightningElement {
    testCode = "H4sIAAAAAAAACs1WbWucQBD+Hsh/WKQfjdylLYTCfbjaF9qkcI3HtRDyYdVBl667sjvbYoP/vbuanG9JrykkKIg6zzMzz87MqjfHR4R4GS3gJyjNpPDeEO80WASni1fB6zPPb/DYMJ72CEtLWNxihUwNB23NV+6ZkJv2soe2VQnO6fvlRRDmVNEEQb11EXXw1aTu/AhCoqV9aRx8stYaiphXJ2FkHUqf7Nrcq06ZT0LD0ShYCTCoKPfJxsScJedQbeUPECthOG81NmJSitTK2Kuzphf4WGnvbJCJvC6JjXnHd2G3ygA5Z2JAmJTxDqvbm9r/7zJGJp5pFQfKDhfxlu6ChlJow5+rgmtExWKDoGdYxLG4w3XcSCZQb4xKcqohHeZ0dUYFIsPcAgt/gKwzxhlWU2ArTZYL0HoKfRIInLMMRAJT9BvjvJS/QE2h95l0xs5W9xdBy6gEgSM3a76EgjLBRGahl2d9LLarXZcT8xMOTljFoAQgS+Y4ORN1h0eHu/KdLPsmDRwStCvovezbYzBVltnla7ZwDsrELNkxTTPw/DFZmqa7yzGwo4rRBvI+UDtSfbjuHq6fq8VGoyzYb9jjc+z0AyIPN1zYfwAb3Mnom0vAe6x2j6fNTp7QlRS2n9G9Xk/ZnFxKDRFShfaFcCET6gZ1jg36i9B/+DCO/Fyyz7Is6eM+kO5yfXxU/wEAeIti/gkAAA==";

    mutantAp = 44;
    truekinAp = 38;

    baseJson = {
        "gameversion": "2.0.204.58",
        "buildversion": "1.0.0",
        "modules": [
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudGenotypeModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudGenotypeModuleData, Assembly-CSharp",
                    "Genotype": "Mutated Human",
                    "version": "1.0.0"
                }
            },
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudSubtypeModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudSubtypeModuleData, Assembly-CSharp",
                    "Subtype": "Nomad",
                    "version": "1.0.0"
                }
            },
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudMutationsModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudMutationsModuleData, Assembly-CSharp",
                    "mp": 0,
                    "selections": [
                        {
                            "Mutation": "Carapace",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        },
                        {
                            "Mutation": "Double-muscled",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        },
                        {
                            "Mutation": "Multiple Legs",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        },
                        {
                            "Mutation": "Night Vision",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        },
                        {
                            "Mutation": "Wings",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        },
                        {
                            "Mutation": "Tonic Allergy",
                            "Count": 1,
                            "Variant": 0,
                            "variantName": ""
                        }
                    ],
                    "version": "1.0.0"
                }
            },
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudAttributesModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudAttributesModuleData, Assembly-CSharp",
                    "PointsPurchased": {
                        "Strength": 8,
                        "Agility": 8,
                        "Toughness": 6,
                        "Intelligence": 8,
                        "Willpower": 8,
                        "Ego": 6
                    },
                    "apSpent": -44,
                    "apRemaining": 0,
                    "baseAp": 44,
                    "version": "1.0.0"
                }
            },
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudCustomizeCharacterModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudCustomizeCharacterModuleData, Assembly-CSharp",
                    "name": null,
                    "pet": null,
                    "gender": null,
                    "pronounSet": null,
                    "version": "1.0.0"
                }
            },
            {
                "moduleType": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModule, Assembly-CSharp, Version=2.0.204.58, Culture=neutral, PublicKeyToken=null",
                "data": {
                    "$type": "XRL.CharacterBuilds.Qud.QudChooseStartingLocationModuleData, Assembly-CSharp",
                    "StartingLocation": "Joppa",
                    "version": "1.0.0"
                }
            }
        ]
    }

    async go() {
        let input = this.template.querySelector("input");
        let code = input.value;
        let json = await this.fetchJsonForBuildCode(input.value);
        input.value = "";

        console.log(json);

        let buildCode = await this.fetchBuildCodeForJson(json);

        console.log(code == buildCode);
    }

    stringifyForEncoding(json) {
        let ret = JSON.stringify(json, null, 2);
        ret = ret.replace(/\n/g, "\r\n");
        return ret;
    }

    async fetchJsonForBuildCode(buildCode) {
        let req = new Request(`/api/codes?` + new URLSearchParams({
            method: "parse",
            value: buildCode
        }));
        let response = await fetch(req);
        if (!response.ok) {
            console.log(await response.text());
            return;
        }

        return await response.json();
    }

    async fetchBuildCodeForPayload(payload) {
        let template = JSON.parse(JSON.stringify(this.baseJson));

        template.modules[0].data.Genotype = payload.genotype;
        template.modules[1].data.Subtype = payload.subtype;
        if (payload.genotype == "True Kin") {
            template.modules[2].data.PointsPurchased = payload.pointSpread;
            template.modules[2].data.apRemaining = this.truekinAp - payload.apSpent;
            template.modules[2].data.apSpent = 0 - payload.apSpent;
            template.modules[2].data.baseAp = this.truekinAp;
            template.modules[3].data.selections = payload.cybernetics;
        }
        else {
            template.modules[2].data.mp = payload.mpRemaining;
            template.modules[2].data.selections = payload.mutations;
            template.modules[3].data.PointsPurchased = payload.pointSpread;
            template.modules[3].data.apSpent = 0 - payload.apSpent;
            template.modules[3].data.apRemaining = this.mutantAp - payload.apSpent;
            template.modules[3].data.baseAp = this.mutantAp;
        }
        template.modules[4].data.name = payload.name;

        return await this.fetchBuildCodeForJson(template);
    }

    async fetchBuildCodeForJson(json) {
        let req = new Request(`/api/codes?` + new URLSearchParams({
            method: "build",
            value: this.stringifyForEncoding(json)
        }));
        let response = await fetch(req);
        if (!response.ok) {
            console.log(await response.text());
            return;
        }

        let text = await response.text();
        return text.substring(1, text.length - 1);
    }
}