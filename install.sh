
DIR=$( cd "$( dirname "$0" )" && pwd )

# Removed a file safely, del if symlink, move if real file.
safeDel(){
    echo "Safe del of" $1
    if [ ! -e $1 ]; then
        echo "File did not exist before"
        return
    fi
    if [ -L $1 ]; then
        # Delete the symlink
        echo "Deleteing the symlink" $1
        rm $1
        return
    fi

    if [ -f $1 ]; then
        echo "Moving file" $1 "to" $1.old
        rm $1.old
        mv $1 $1.old
        return
    fi
    echo "Did noting with this file" $1
}

newSymln(){
    echo "installing" $1 $2
    safeDel $2
    ln -s $1 $2
    echo
}

newSymln $DIR/terminal/zsh $HOME/.zsh
newSymln $DIR/terminal/zshrc $HOME/.zshrc
newSymln $DIR/terminal/oh-my-zsh $HOME/.oh-my-zsh
newSymln $DIR/terminal/profile $HOME/.profile
newSymln $DIR/bspwmrc $HOME/.config/bspwm
newSymln $DIR/bspwmrc $HOME/.config/sxhkd

