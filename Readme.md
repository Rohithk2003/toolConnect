
### **Files:**

The following is the file structure of the project where I added or modified. Default project files are ommitted.

```
/ (folder)
-- (files)

/ToolConnect - main project folder
 --README.md - this file
   /Server - Backend Folder
    --requirements.txt - list of libraries needed to run
   --settings.py - slightly modified settings
   --urls.py - path configuration
  /toolShare - App
   --admin.py - admin settings for model view
   --models.py - database models
   --urls.py - all standard HTTP request routing handled here
   --views.py - most of the API's are handled here
  /Client - React library
      /components - React Component folder
       --Categories.js - Component for handling categories
       --Filters.js - Component for handling Filters
       --Footer.js - Component for handling Footer
       --ItemPageLayout.js - Component for handling Layout for displaying items
       --Items.js - Component for handling displaying items
       --Layout.js - Component for handling layout of the page
       --loadPreFiles.js - Component for handling loading of data
       --modal.js - Component for handling modals
       --navbar.js - Component for handling navbar
       --usersItem.js - Component for handling users item page
       --wesbitePoliciesLayout.js - Component for handling policies of the wesbite

      /pages - folder that contains main pages
        --index.js -  Index.js
        /product - folder for id.js
         --id.js - Component for displaying item        
         /seller - folder for seller functions
         --additem.js - Component for adding item
         --deleteitem.js - Component for deleting item
         /user - folder for all user's functions
         --wishlist.js - Component for listing wishlist items
        --all.js - Component for displaying all items
        --login.js - Component for displaying login
        --orderhistory.js - Component for displaying order history
        --register.js - Component for displaying register
        --searc.js - Component for search functionality
        --shipping-return-policy.js - Component for policies
        --signout.js - Component for signing out
        --solditems.js - Component for displaying sold items
        
        
       --package.json 
  /reference - files inside reference when learning websockets
```

---

<br>

### **How to run application:**

The project has separate frontend and backend so they need to be launched separately. <br><br>
**Django server and backend setup**

1. Install all required packages.

```
pip install -r requirements.txt
```

3. Initialize the database with makemigrations, migrate, then create superuser.

```
py manage.py makemigrations
py manage.py migrate
py manage.py createsuperuser
```

6. Launch the Django server. If set up correctly, server will launch on https://toolconnect.onrender.com/.

```
py manange.py runserver
```

**Next.js frontend setup**

7. Navigate to the 'frontend' folder inside capstone project. In addition to the standard packages required to run the
   project, I built this project using **Parcel** as the compiler. I recommend using parcel to run the frontend. Install
   using npm or Yarn.Npm will auto install all requirements .

8. Download the required dependencies as listed in package.json file. The CSS files and CSS frameworks are listed as CDN
   in the html file. These files are primarily babel files to run react.

```
npm install
```

9. Launch the app. The package.json file has been configured so that npm run start launches the app using
   parcel @ http://127.0.0.1:1234

   Django  must continue to run in order for application to operate as intended.

```
npm run dev
```
