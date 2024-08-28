import { Button, Checkbox, Tab, Tabs, TextField } from "@mui/material"
import React, { useRef } from "react";

const s3NotesConfig = "s3NotesConfig"

function S3TabPanel({handleSettingsChange, config}) {

    const params = {
        style: { marginTop: "1em"},
        variant: 'standard',
        fullWidth: true,
    }

    const bucketRef = useRef()
    const endpointRef = useRef()
    const regionRef = useRef()
    const accessKeyIdRef = useRef()
    const secretAccessKeyRef = useRef()
    const s3ForcePathStyleRef = useRef()


    let s3ForcePathStyleDefault = { 'defaultChecked': true }
    if ('s3ForcePathStyle' in config && !config['s3ForcePathStyle']) {
        s3ForcePathStyleDefault = {}
    }

    return (<div>
        <TextField
            {...params}
            defaultValue={config.bucket} inputRef={bucketRef} name="bucket" aria-label="S3 Bucket" label="Bucket" /><br />
        <TextField
            {...params}
            defaultValue={config.endpoint} inputRef={endpointRef} name="endpoint" aria-label="S3 Endpoint" label="S3 Endpoint" /><br />
        <TextField
            {...params}
            defaultValue={config.region || "us-east-1"} inputRef={regionRef} name="region" aria-label="AWS Region" label="AWS Region" /><br />
        <TextField
            {...params}
            defaultValue={config['access-key-id']} inputRef={accessKeyIdRef} name="access-key-id" aria-label="Access Key ID" label="Access Key ID" /><br />
        <TextField
            {...params}
            defaultValue={config['secret-access-key']} inputRef={secretAccessKeyRef} name="secret-access-key" aria-label="Secret Access Key" label="Secret Access Key" /><br />
        <Checkbox
            {...s3ForcePathStyleDefault}
            style= { { marginTop: "1em" } }
            variant= 'standard'
            inputRef={s3ForcePathStyleRef}
            name="s3ForcePathStyle" aria-label="S3 Force Path Style" label="S3 Force Path Style"
            />

        <Button
            style={{ marginTop: "1em"}}
            variant="contained"
            onClick={(e) => {
                config.epoch += 1
                config.bucket = bucketRef.current.value
                config.endpoint = endpointRef.current.value
                config.region = regionRef.current.value
                config.accessKeyId = accessKeyIdRef.current.value
                config.secretAccessKey = secretAccessKeyRef.current.value
                config.s3ForcePathStyle = s3ForcePathStyleRef.current.checked
                handleSettingsChange(e, config)
            }} >Set Configuration</Button>

    </div>)
}

function SelfTabPanel({handleSettingsChange, config}) {
    return (<div>
        <i>Not yet implemented.</i>
        <button onClick={(e) => {
            handleSettingsChange(e, {epoch: config.epoch+1, type: config.type})
        }} >Clear Settings</button>

    </div>)
}

function NoStoragePanel({handleSettingsChange, config}) {
    return (<div>
        <button onClick={(e) => {
            handleSettingsChange(e, {epoch: config.epoch+1, type: config.type})
        }} >Clear Settings</button>

    </div>)
}

function TabPanel(props = {}) {
    return (<div hidden={props.value !== props.type}>{props.name || "Name" }{props.children}</div>)
}

function Settings() {

    const [configSettings, setConfgSettings] = React.useState(() => {
        if (s3NotesConfig in localStorage) {
            let config = JSON.parse(localStorage.getItem(s3NotesConfig))
            config.epoch = 0
            return config
        }

        return {type: "none", epoch: 0}
    })

    let epoch = 0

    const handleSettingsChange = (event, newValue) => {
        if (newValue.epoch !== epoch) {
            // NOTE: Create a new object and prevent cyclical updates using epoch.
            epoch = newValue.epoch
            delete(newValue.epoch)
            setConfgSettings({epoch, ...newValue})
            localStorage.setItem(s3NotesConfig, JSON.stringify(newValue))
        }
    }

    const handleTypeChange = (event, newType) => {
        setConfgSettings({...configSettings, type: newType})
    }

    return (<div>
        <h1>Settings</h1>
        <h2>Secrets</h2>
        <TextField variant="standard" name="password" type="password"
            label="Document Encryption Password"
            defaultValue={configSettings.password}
            onChange={(event) => {
                configSettings.epoch += 1
                configSettings.password = event.target.value
                handleSettingsChange(event, configSettings)
            }}
        />

        <Checkbox
            defaultChecked={configSettings.encryptSettings}
            variant= 'standard'
            name="encryptSettings"
            aria-label="Encrypt configuration"
            label="Encrypt Configuration"
            onChange={(event) => {
                configSettings.encryptSettings = event.target.checked
                configSettings.epoch += 1
                handleSettingsChange(event, configSettings)
            }}
            />

        <h2>Storage Settings</h2>
        <Tabs value={configSettings.type} onChange={handleTypeChange} aria-label="storage settings">
            <Tab label="None" value="none"></Tab>
            <Tab label="S3" value="s3"></Tab>
            <Tab label="Self" value="self"></Tab>
        </Tabs>
        <TabPanel value={configSettings.type} name="None" type="none">
            <NoStoragePanel handleSettingsChange={handleSettingsChange} config={configSettings}/>
        </TabPanel>
        <TabPanel value={configSettings.type} name="S3" type="s3">
            <S3TabPanel handleSettingsChange={handleSettingsChange} config={configSettings}/>
        </TabPanel>
        <TabPanel value={configSettings.type} name="Self" type="self">
            <SelfTabPanel handleSettingsChange={handleSettingsChange} config={configSettings}/>
        </TabPanel>

        <pre>
         {JSON.stringify(configSettings, 2, 2)}
        </pre>
    </div>)
}

export default Settings