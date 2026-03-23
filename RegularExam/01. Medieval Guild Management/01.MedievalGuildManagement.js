function solve(input) {
    //"{member name} {role} {skill 1,skill 2,...}"
    let memberRole = {};
    let memberSkills= {};

    let n = Number(input.shift());

    for (let i = 0; i < n; i++) {
        let line = input.shift();

        let [name, role, skillsAsString] = line.split(' ');
        let skills = skillsAsString.split(',');

        memberRole[name] = role;
        memberSkills[name] = new Set(skills);
    }

    while(input[0] != 'End') {
        let line = input.shift();

        let tokens = line.split(' / ');
        let command = tokens[0];


        if (command == 'Perform') {
            //Perform / {member name} / {role} / {skill}"
            let name = tokens[1];
            let role = tokens[2];
            let skill = tokens[3];

            if (memberRole[name] != role || !memberSkills[name].has(skill)) {
                console.log(`${name} cannot perform the skill: ${skill}.`);
                continue;
            }
//?????
            console.log(`${name} has successfully performed the skill: ${skill}!`);

        } else if (command == 'Reassign') {
            //Reassign / {member name} / {new role}"
            let name = tokens[1];
            let role = tokens[2];

            memberRole[name] = role;

            console.log(`${name} has been reassigned to: ${role}`);

        } else if (command == 'Learn Skill') {
            let name = tokens[1];
            let skill = tokens[2];
            
            if (memberSkills[name].has(skill)) {
                console.log(`${name} already knows the skill: ${skill}.`);
                continue;
            }

            memberSkills[name].add(skill);

            console.log(`${name} has learned a new skill: ${skill}.`);
        }
    }

    for (let name in memberRole) {
        let sortedTasks = [...memberSkills[name].values()].sort((a, b) => a.localeCompare(b));

        console.log(`Guild Member: ${name}, Role: ${memberRole[name]}, Skills: ${sortedTasks.join(', ')}`);
    }
}


// Arthur has successfully performed the skill: swordsmanship!
// Merlin cannot perform the skill: fireball.
// Gwen has learned a new skill: purification.
// Gwen has successfully performed the skill: purification!
// Merlin has been reassigned to: healer
// Merlin has successfully performed the skill: teleport!
// Guild Member: Arthur, Role: warrior, Skills: shield, swordsmanship
// Guild Member: Merlin, Role: healer, Skills: fireball, teleport
// Guild Member: Gwen, Role: healer, Skills: alchemy, healing, purification

// solve([
//     "3",
//     "Arthur warrior swordsmanship,shield",
//     "Merlin mage fireball,teleport",
//     "Gwen healer healing,alchemy",
//     "Perform / Arthur / warrior / swordsmanship",
//     "Perform / Merlin / warrior / fireball",
//     "Learn Skill / Gwen / purification",
//     "Perform / Gwen / healer / purification",
//     "Reassign / Merlin / healer",
//     "Perform / Merlin / healer / teleport",
//     "End"
//   ]
//   );



solve([
    "4",
    "Lancelot knight jousting,swordplay",
    "Morgana sorceress dark_magic,illusion",
    "Robin archer archery,stealth",
    "Galahad paladin healing,swordplay",
    "Perform / Robin / archer / archery",
    "Perform / Morgana / knight / illusion",
    "Learn Skill / Lancelot / swordplay",
    "Learn Skill / Robin / tracking",
    "Learn Skill / Robin / tracking",
    "Reassign / Galahad / warrior",
    "Perform / Galahad / warrior / healing",
    "Reassign / Galahad / healer",
    "Perform / Galahad / healer / healing",
    "End"
  ]
  );