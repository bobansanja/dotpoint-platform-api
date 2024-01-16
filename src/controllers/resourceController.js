const resourceModel = require("../models/resourceModel");
const moduleResourceModel = require("../models/moduleResourceModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../..", "upload"));
    },
    filename: (req, file, cb) => {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["video", "image", "pdf"];
    // this part will handle various video / image files
    let fileType = file.mimetype.split("/")[0];
    // this part will cover the pdf
    if ("application" === fileType) {
        fileType = file.mimetype.split("/")[1];
    }

    if (allowedFileTypes.includes(fileType)) {
        req.fileType = fileType;
        cb(null, true); // Accept the file
    } else {
        // Reject the file and provide an error
        cb(
            new Error("Invalid file type. Supported types: video, image, pdf"),
            false
        );
    }
};

const upload = multer({ storage, fileFilter });

const uploadResource = async (req, res) => {
    try {
        // Use 'single' if you want to upload a single file
        upload.single("file")(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.toString() });
            }

            const file = req.file;
            const display_name = req.body.display_name || file.originalname;

            // Save resource details to the database
            const resourceData = {
                original_name: file.originalname,
                name: file.filename,
                path: `/static/${file.filename}`,
                file_type: req.fileType.toUpperCase(),
                display_name: display_name,
            };

            const newResource = await resourceModel.uploadResource(
                resourceData
            );
            res.status(201).json();
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

const getAllResources = async (req, res) => {
    try {
        const resources = await resourceModel.getAllResources();
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getResourcesByModule = async (req, res) => {
    try {
        const moduleId = parseInt(req.params.moduleId);
        const resources = await moduleResourceModel.getResourcesByModuleId(
            moduleId
        );

        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateResource = async (req, res) => {
    try {
        const resourceId = parseInt(req.params.resourceId);
        const { display_name } = req.body;

        if (!display_name) {
            return res
                .status(400)
                .json({ error: "Display name is required for update" });
        }

        const existingResource = await resourceModel.getResourceById(
            resourceId
        );

        if (!existingResource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const updatedResource = await resourceModel.updateResourceDisplayName(
            resourceId,
            display_name
        );

        res.json({ resource: updatedResource });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

const deleteResource = async (req, res) => {
    try {
        const resourceId = parseInt(req.params.resourceId);

        // Check if the resource exists
        const existingResource = await resourceModel.getResourceById(
            resourceId
        );
        if (!existingResource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        // Delete the resource from the database
        await resourceModel.deleteResource(resourceId);

        // Delete the file associated with the resource using fs.unlink
        const filePath = path.join(
            __dirname,
            "../..",
            "upload",
            existingResource.name
        );

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.error(`File not found: ${filePath}`);
        }

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    uploadResource,
    getAllResources,
    getResourcesByModule,
    updateResource,
    deleteResource,
};
