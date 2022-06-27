let eventrolename = "Event-Role";
let eventorgarolename = "Event-Organizer"

module.exports = {
    name: "eventrole",
    description: "Used to manage the event-role.",
    usage: `$eventrole add <user> | <user> is a user either as a mention or with his userid\nExamples: \n\t$eventrole add <@82799177439907840> 
    \n\t$eventrole add 82799177439907840\n$eventrole remove <user> | <user> is a user either as a mention or with his userid
    \nExamples: \n\t$eventrole remove <@82799177439907840> \n\t$eventrole remove 82799177439907840`,
    guildOnly: true,
    execute(message, args) {
        //TODO Implement
        /**Command for giving the users with the role Event-Organizer the option to add and remove the Event-Role from users.
         *Initially checks if the args are properly declared, if the user has the Event-Organizer role (could add multiple roles to 
         allow access to this command)and then gets the eventrole from the server, checks if a user was mentioned 
         or userID was given as argument and stores is as a varible. Afterwards checks if the user wants to add or remove a role and double 
         checks again if the targeted user has the role already added or removed and then adds it/removes it.
         */
        if (!(message.member.roles.cache.find((role) => role.name === eventorgarolename))) {
            message.channel
                .send(
                    `Error. You don't have permission to use this command.`
                )
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(console.error);
            return;
        }
        if (
            args[0] == undefined ||
            args.length < 2 ||
            args[1] == undefined
        ) {
            message.channel
                .send(
                    `Not proper usage of the command. Please use ${message.client.prefix}help ${this.name} for more information on how to use the command.`
                )
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(console.error);
            return;
        }

        eventrole = message.guild.roles.cache.find((r) => r.name === eventrolename);
        if (message.mentions.members.first()) {
            targetuser = guild.members.cache.get(message.mentions.users.first().id)

        } else {
            targetuser = guild.members.cache.get(args[1]);

        }
        if (targetuser == null) {
            message.channel
                .send(
                    `Error. The targeted User was not found. Please make sure that you either use the discord id or mention the user.`
                )
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(console.error);
            return;
        }
        //check if the event-role exists
        if (eventrole == null) {
            message.channel
                .send(
                    `Error. The Role with the name ${eventrolename} does not exist. Please ensure that the role exists or change the hardcoded rolenames.`
                )
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(console.error);
            return;
        }




        if (args[0].toLowerCase() == "add") {
            if (targetuser.roles.cache.find((role) => role.name === eventrolename)) {
                message.channel.send("Error: User already has the role.").then((msg) => {
                    msg.delete({
                        timeout: 5000
                    });
                });
            } else {
                targetuser.roles.add(eventrole).catch(console.error);
                message.channel.send("Success!").then((msg) => {
                    msg.delete({
                        timeout: 5000
                    });
                });
            }
        } else if (args[0].toLowerCase() == "remove") {
            if (targetuser.roles.cache.find((role) => role.name === eventrolename)) {
                targetuser.roles.remove(eventrole).catch(console.error);
                message.channel
                    .send(`Succesfully removed the ${eventrolename} role.`)
                    .then((msg) => {
                        msg.delete({
                            timeout: 5000
                        });
                    });
            } else {
                message.channel
                    .send(`Something went wrong. The targeted User does not have the ${eventrolename} role.`)
                    .then((msg) => {
                        msg.delete({
                            timeout: 5000
                        });
                    });
            }

        }

    },
};