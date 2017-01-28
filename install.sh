
DIR=$( cd "$( dirname "$0" )" && pwd )

# Removed a file safely, del if symlink, move if real file.
safeDel(){
    if [ ! -f $1 ]; then
        return
    fi
    if [ -L $1 ]; then
        # Delete the symlink
        rm $1
        return
    fi

    if [ -f $1 ]; then
        rm $1.old
        mv $1 $1.old
    fi
}

newSymln(){
    safeDel $2
    ln -s $1 $2
}

newSymln $DIR/terminal/zsh $HOME/.zsh
newSymln $DIR/terminal/zshrc $HOME/.zshrc
newSymln $DIR/terminal/oh-my-zsh $HOME/.oh-my-zsh
newSymln $DIR/terminal/profile $HOME/.profile
newSymln $DIR/bspwmrc $HOME/.config/bspwm
newSymln $DIR/bspwmrc $HOME/.config/sxhkd

