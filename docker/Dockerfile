##############
# Base Image #
##############

FROM rtvu/docker-ubuntu

########################
# Setup User Workspace #
########################

RUN \
  mkdir ${HOME}/workspace && \
  git config --global --add safe.directory ${HOME}/workspace

#################################
# Setup Development Environment #
#################################

ARG NODE_VERSION=20

RUN \
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
  /bin/bash -c 'source ${HOME}/.nvm/nvm.sh && nvm install ${NODE_VERSION}' && \
  /bin/bash -c 'source ${HOME}/.nvm/nvm.sh && nvm alias default ${NODE_VERSION}' && \
  /bin/bash -c 'source ${HOME}/.nvm/nvm.sh && nvm use default' && \
  /bin/bash -c 'source ${HOME}/.nvm/nvm.sh && corepack enable'

###########
# Startup #
###########

WORKDIR ${HOME}/workspace

ENTRYPOINT ["docker/entrypoint"]

CMD ["/bin/bash"]
