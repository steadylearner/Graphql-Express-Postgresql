import subprocess as cmd
# from termcolor import colored

# 1.

cp = cmd.run("git add .", check=True, shell=True)
# print(cp)

# 2.

response = input("Do you want to use the default message for this commit?([y]/n)\n")
message = "update the repository"

if response.startswith('n'):
    message = input("What message you want?\n")

# 3.

cp = cmd.run(f"git commit -m '{message}'", check=True, shell=True)
# print(cp)

# 4.

# Search how to skip login process for github push
# $git remote set-url origin git@github.com:steadylearner/automation.git 
# https://help.github.com/en/articles/connecting-to-github-with-ssh
# https://github.com/settings/keys 
cp = cmd.run("git push -u origin master -f", check=True, shell=True)
# print(cp)

