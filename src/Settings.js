import { Button, Tab, Tabs, TextField } from "@mui/material"
import React from "react";

const s3NotesConfig = "s3NotesConfig"

function S3TabPanel({handleSettingsChange, config}) {

    const onChange = (event) => {
        config[event.target.name] = event.target.value
        console.info(event)
    }

    const params = {
        style: { marginTop: "1em"},
        variant: 'standard',
        fullWidth: true,
        onChange,
    }

    return (<div>
        <TextField
            {...params}
            defaultValue="" name="bucket" aria-label="S3 Bucket" label="Bucket" /><br />
        <TextField
            {...params}
            defaultValue="" name="endpoint" aria-label="S3 Endpoint" label="S3 Endpoint" /><br />
        <TextField
            {...params}
            defaultValue="us-east-1" name="region" aria-label="AWS Region" label="AWS Region" /><br />
        <TextField
            {...params}
            defaultValue="" name="access-key-id" aria-label="Access Key ID" label="Access Key ID" /><br />
        <TextField
            {...params}
            defaultValue="" name="secret-access-key" aria-label="Secret Access Key" label="Secret Access Key" /><br />

        <Button
            style={{ marginTop: "1em"}}
            variant="contained"
            onClick={(e) => {
                config.epoch += 1
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