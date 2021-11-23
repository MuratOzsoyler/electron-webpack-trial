import log from "electron-log"

log.catchErrors({
    showDialog: true,
    onError(error, versions) {
        log.error("Uncaught error in preload", error, versions)
    }
})