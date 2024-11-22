import { Box, Button, Checkbox, Typography, Input, Tab, Tabs, TextField } from "@mui/material"
import React, { useContext, useRef } from "react";
import SettingsContext from "./SettingsContext";
import SettingsImportExport from "./SettingsImportExport";
import { dispatchNeedPasswordEvent } from "./SettingsEvent";
import { dispatchStoreSettings  } from "./SettingsStorageComponent";
import SettingsDefaults from "./SettingsDefaults";

function S3TabPanel({handleSettingsChange, config}) {
    const params = {
        style: { marginTop: "1em"},
        variant: 'standard',
        fullWidth: true,
    }

    const bucketRef = useRef()
    const endpointRef = useRef()
    const regionRef = useRef()
    const prefixRef = useRef()
    const accessKeyIdRef = useRef()
    const secretAccessKeyRef = useRef()
    const s3ForcePathStyleRef = useRef()

    return (<div>
        <TextField
            {...params}
            defaultValue={config.settings.bucket} inputRef={bucketRef} name="bucket" aria-label="S3 Bucket" label="Bucket" /><br />
        <TextField
            {...params}
            defaultValue={config.settings.endpoint} inputRef={endpointRef} name="endpoint" aria-label="S3 Endpoint" label="S3 Endpoint" /><br />
        <TextField
            {...params}
            defaultValue={config.settings.region || "us-east-1"} inputRef={regionRef} name="region" aria-label="AWS Region" label="AWS Region" /><br />
        <TextField
            {...params}
            defaultValue={"prefix" in config.settings ? config.settings.prefix : "data/"} inputRef={prefixRef} name="prefix" aria-label="AWS Prefix" label="AWS Prefix" /><br />
        <TextField
            {...params}
            defaultValue={config.settings['accessKeyId']} inputRef={accessKeyIdRef} name="access-key-id" aria-label="Access Key ID" label="Access Key ID" /><br />
        <TextField
            {...params}
            defaultValue={config.settings['secretAccessKey']} inputRef={secretAccessKeyRef} name="secret-access-key" aria-label="Secret Access Key" label="Secret Access Key" /><br />
        <Typography variant="string" style={{marginTop: '1em', verticalAlign: 'middle'}}>
         Force Path Style:
        </Typography>
         <Checkbox
            defaultChecked = {!('s3ForcePathStyle' in config.settings && !config.settings['s3ForcePathStyle'])}
            style= { { marginTop: "1em", verticalAlign: 'middle' } }
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
                config.settings.prefix = prefixRef.current.value
                config.settings.accessKeyId = accessKeyIdRef.current.value
                config.settings.secretAccessKey = secretAccessKeyRef.current.value
                config.settings.s3ForcePathStyle = s3ForcePathStyleRef.current.checked
                handleSettingsChange(e, config)
            }} >Store Settings</Button>

    </div>)
}

function SelfTabPanel({handleSettingsChange, config}) {
    const endpointRef = useRef()
    return (<div>
        <TextField
            style={{ marginTop: "1em"}}
            variant='standard'
            fullWidth
            defaultValue={config.settings.endpoint} inputRef={endpointRef} name="endpoint" aria-label="Endpoint" label="Endpoint" /><br />
        <Button
            variant="contained"
            onClick={(e) => {
                config.settings.type = 'self'
                //config.settings.endpoint = `${process.env.PUBLIC_URL}/storage`
                config.settings.endpoint = endpointRef.current.value
                handleSettingsChange(e, {...config})
            }} >Store Settings</Button>

    </div>)
}

function NoStoragePanel({handleSettingsChange, config}) {
    return (<div>
        <Button
            variant="contained"
            onClick={(e) => {
                config.settings = {type: 'none'}
                handleSettingsChange(e, { settings: {type: 'none'}})
        }} >Clear Settings</Button>

    </div>)
}

function CustomTabPanel(props = {}) {
    return (<div style={{margin: '1em'}} hidden={props.value !== props.type}>{props.children}</div>)
}

function SettingsComponent() {
    // Initially set in App.js.
    const [settings, setSettings] = useContext(SettingsContext)

    // We need "type" for the tabs. 
    if (!('settings' in settings)) {
        settings.settings = SettingsDefaults
    }

    const handleSettingsChange = (event, newValue) => {
        const settings = {...newValue}
        dispatchStoreSettings(event.target, settings)
    }

    const handleTypeChange = (event, newType) => {
        settings.settings.type = newType
        setSettings({...settings})
    }

    const style = {
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '0.5em',
        boxShadow: '0.2em 0.2em 0.2em 0em #a0a0a0',
        padding: '0.5em',
        marginBottom: '1em',
    }

    return (
        <div>
        <h1>Settings</h1>

        <Box style={style}>
        <h2>Settings Password</h2>
        <Button aria-label="Change settings password." label="Change settings password" onClick={event => dispatchNeedPasswordEvent(event.target)}>Change Settings Password</Button>
        </Box>


        <Box style={style}>
        <h2>Storage Settings</h2>
        Document Storage Password: &nbsp;
        <Input type="password" aria-label="document password" label="Document Password" name="document-password" 
            defaultValue={settings.settings.documentPassword}
            onChange={(e) => {
                settings.settings.documentPassword = e.target.value
            }}
        />

        <Tabs value={settings.settings.type} onChange={handleTypeChange} aria-label="storage settings">
            <Tab label="None" value="none"></Tab>
            <Tab label="S3" value="s3"></Tab>
            <Tab label="Self" value="self"></Tab>
        </Tabs>
        <CustomTabPanel value={settings.settings.type} name="None" type="none" >
            <NoStoragePanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </CustomTabPanel>
        <CustomTabPanel value={settings.settings.type} name="S3" type="s3">
            <S3TabPanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </CustomTabPanel>
        <CustomTabPanel value={settings.settings.type} name="Self" type="self">
            <SelfTabPanel handleSettingsChange={handleSettingsChange} config={settings}/>
        </CustomTabPanel>
        </Box>

        <Box style={style}>
        <h2>Import/Export</h2>
        { <SettingsImportExport /> }

        <pre>
         {JSON.stringify(settings, 2, 2)}
        </pre>
        </Box>
        </div>
    )
}

export default SettingsComponent