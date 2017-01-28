
function setgo(){
    if [ `type -p go` = "" ]; then
        export PATH=$PATH:/usr/local/go/bin
    fi
    export GOPATH=`pwd`
    export PATH=$PATH:`pwd`/bin
}


