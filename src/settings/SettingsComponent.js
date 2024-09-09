import { Button, Checkbox, Tab, Tabs, TextField } from "@mui/material"
import React, { useContext, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { dispatchNeedPasswordEvent } from "./SettingsEvent";

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
            defaultChecked = {!('s3ForcePathStyle' in config && !config['s3ForcePathStyle'])}
            style= { { marginTop: "1em" } }
            variant= 'standard'
            inputRef={s3ForcePathStyleRef}
            name="s3ForcePathStyle" aria-label="S3 Force Path Style" label="S3 Force Path Style"
            />

        <Button
            style={{ marginTop: "1em"}}
            variant="contained"
            onClick={(e) => {
                config.settings.bucket = bucketRef.current.value
                config.settings.endpoint = endpointRef.current.value
                config.settings.region = regionRef.current.value
                config.settings.accessKeyId = accessKeyIdRef.current.value
                config.settings.secretAccessKey = secretAccessKeyRef.current.value
                config.settings.s3ForcePathStyle = s3ForcePathStyleRef.current.checked
                handleSettingsChange(e, config)
            }} >Store Settings</Button>

    </div>)
}

function SelfTabPanel({handleSettingsChange, config}) {
    return (<div>
        <i>Not yet implemented.</i>
        <Button
            variant="contained"
            onClick={(e) => {
                config.settings.type = 'self'
                handleSettingsChange(e, {...config})
            }} >Store Settings</Button>

    </div>)
}

function NoStoragePanel({handleSettingsChange, config}) {
    return (<div>
        <Button
            variant="contained"
            onClick={(e) => {
                config.settings.type = 'none'
                handleSettingsChange(e, { settings: {type: 'none'}})
        }} >Clear Settings</Button>

    </div>)
}

function TabPanel(props = {}) {
    return (<div hidden={props.value !== props.type}>{props.name || "Name" }{props.children}</div>)
}

function SettingsComponent() {
    // Initially set in App.js.
    const [settings, setSettings] = useContext(SettingsContext)

    // We need "type" for the tabs. 
    if (!('settings' in settings)) {
        settings.settings = { 'type': 'none' }
    }

    const handleSettingsChange = (event, newValue) => {
        setSettings({...newValue})
    }

    const handleTypeChange = (event, newType) => {
        settings.settings.type = newType
        setSettings({...settings})
    }


    return (
        <div>
        <h1>Settings</h1>

        <h2>Settings Password</h2>
        <Button aria-label="Change settings password." label="Change settings password" onClick={event => dispatchNeedPasswordEvent(event.target)}>Change Settings Password</Button>

        <h2>Storage Settings</h2>
        <Tabs value={settings.settings.type} onChange={handleTypeChange} aria-label="storage settings">
            <Tab label="None" value="none"></Tab>
            <Tab label="S3" value="s3"></Tab>
            <Tab label="Self" value="self"></Tab>
        </Tabs>
        <TabPanel value={settings.settings.type} name="None" type="none">
            <NoStoragePanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </TabPanel>
        <TabPanel value={settings.settings.type} name="S3" type="s3">
            <S3TabPanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </TabPanel>
        <TabPanel value={settings.settings.type} name="Self" type="self">
            <SelfTabPanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </TabPanel>

        <pre>
         {JSON.stringify(settings, 2, 2)}
        </pre>
        </div>
    )
}

export default SettingsComponent