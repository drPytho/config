#Exports 
#
#
function addToPath(){
	echo "export PATH=\$PATH:"$1 >> $HOME/.zsh/exports.zsh
	export PATH=$PATH:$1
}
#export PATH=/some/nice/path:$PATH

export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:"/usr/local/Cellar/libffi/<version>/lib/pkgconfig"

export PATH=$PATH:~/bin
export PATH=$PATH:/Users/filip/.composer/vendor/bin

export PATH=$PATH:/usr/texbin
export PATH=$PATH:/usr/local/sbin

export PKG_CONFIG_PATH=/usr/local/Cellar/cairo/1.10.2/lib/pkgconfig:$PKG_CONFIG_PATH
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/X11/lib/pkgconfig
export PATH=$PATH:/Users/filip/Library/Android/sdk/platform-tools
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin
export PATH=$PATH:/Users/filip/Library/Android/sdk/platform-tools

export GOPATH=$HOME/workspace/golang
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin


