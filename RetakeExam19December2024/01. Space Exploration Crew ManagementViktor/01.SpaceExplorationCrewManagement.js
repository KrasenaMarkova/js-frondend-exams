// Viktor

function solve(input) {
    let spaceCraftSection = {};
    let spaceSkill = {};

    let n = Number(input.shift());

    for (let i = 0; i < n; i++) {
        let line = input.shift();

        //"{astronaut name} {spacecraft section} {skill 1,skill 2,...}"
        let [name, section, tasksAsString] = line.split(' ');
        let skills = tasksAsString.split(',');

        spaceCraftSection[name] = section;
        spaceSkill[name] = new Set(skills);
    }

        while(input[0] != 'End') {
            let line = input.shift();
    
            let tokens = line.split(' / ');
            let command = tokens[0];

            if (command == 'Perform') {
                //Perform / {astronaut name} / {spacecraft section} / {skill}"
                let name = tokens[1];
                let section = tokens[2];
                let skill = tokens[3];

                if (spaceCraftSection[name] != section || !spaceSkill[name].has(skill)) {
                    console.log(`${name} cannot perform the skill: ${skill}.`);
                } else {
                    console.log(`${name} has successfully performed the skill: ${skill}!`);
                }
             
            } else if (command == 'Transfer') {
                //Transfer / {astronaut name} / {new spacecraft section}"
                let name = tokens[1];
                let section = tokens[2];

                spaceCraftSection[name] = section;

                console.log(`${name} has been transferred to: ${section}`);

            } else if (command == 'Learn Skill') {
                // Learn Skill / {astronaut name} / {new skill}"
                let name = tokens[1];
                let skill = tokens[2];

                if (spaceSkill[name].has(skill)) {
                    console.log(`${name} already knows the skill: ${skill}.`);
                    continue;
                }

                spaceSkill[name].add(skill);

                console.log(`${name} has learned a new skill: ${skill}.`);
            }
        }

    // output
    for (let name in spaceCraftSection) {
        // - sort tasks by name
       let sortedTasks = [...spaceSkill[name].values()].sort((a, b) => a.localeCompare(b));

        // - print each farmer and their area
        console.log(`Astronaut: ${name}, Section: ${spaceCraftSection[name]}, Skills: ${sortedTasks.join(', ')}`);
   }
}

solve(["2",
    "Alice command_module piloting,communications",
    "Bob engineering_bay repair,maintenance",
    "Perform / Alice / command_module / piloting",
    "Perform / Bob / command_module / repair",
    "Learn Skill / Alice / navigation",
    "Perform / Alice / command_module / navigation",
    "Transfer / Bob / command_module",
    "Perform / Bob / command_module / maintenance",
    "End"]);

//   Alice has successfully performed the skill: piloting!
// Bob cannot perform the skill: repair.
// Alice has learned a new skill: navigation.
// Alice has successfully performed the skill: navigation!
// Bob has been transferred to: command_module
// Bob has successfully performed the skill: maintenance!
// Astronaut: Alice, Section: command_module, Skills: communications, navigation, piloting
// Astronaut: Bob, Section: command_module, Skills: maintenance, repair
