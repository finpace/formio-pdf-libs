FROM node:20-bookworm-slim

ARG FUNCTION_DIR="/function"

# Set installation environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Update sources, install dependencies, and install fonts
RUN apt-get update \
    && apt-get upgrade -y \
    # Dependencies
    && apt-get install -y --no-install-recommends \
    wget \
    g++ \
    cmake \
    make \
    ca-certificates \
    libpoppler-dev \
    libpoppler-qt5-dev \
    qtbase5-dev \
    poppler-utils \
    ghostscript \
    git \
    sudo
    
# Install pdf2htmlEX
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && git clone --single-branch https://github.com/pdf2htmlEX/pdf2htmlEX.git \
    # Checkout a specific commit to avoid brittle builds
    && cd pdf2htmlEX \
    && git reset --hard 6f85c88b1df66b1658bef6a8c478fd5e0ed684af \
    # openjdk-8-jre-headless is not available in bookworm, so we remove it from the script
    # (it seems like we don't actually need it to build successfully)
    && sed -i '/openjdk-8-jre-headless/d' ./buildScripts/getBuildToolsApt \
    && ./buildScripts/buildInstallLocallyApt \
    && cd .. \
    && rm -rf pdf2htmlEX

# Clean up
RUN apt-get clean  \
    && rm -f gf.tar.gz  \
    && apt-get autoremove -y  \
    && apt-get remove wget -y \
    && apt-get remove git -y

# Create and set the working directory
RUN mkdir -p ${FUNCTION_DIR}
WORKDIR ${FUNCTION_DIR}

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install aws-lambda-ric

# Copy source files
COPY src ./src
COPY *.js ./

# Set runtime environment variables
ENV PDF2HTMLEX_PATH="/usr/local/bin/pdf2htmlEX" \
    PSTOPDF_PATH="/usr/bin/ps2pdf"

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]