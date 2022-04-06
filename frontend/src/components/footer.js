import React from "react";
import SimpleReactFooter from "simple-react-footer";
import "./footer.css";

const FooterPage = () => {
    const description = "Dette er et prosjekt i faget Eksperter i Team laget av Håvard, Ivar, Jonathan, Marcus og Ole Martin.";
    const title = "Trondheim SDG";
    const columns = [
    {
        title: "Overskrift 1",
        resources: [
            {
                name: "Hjem",
                link: "/hjem"
            }
        ]
    },
    {
        title: "Overskrift 2",
        resources: [
            {
                name: "Trondheim kommune",
                link: "/trd"
            },
        ]
    },
    {
        title: "Overskrift 3",
        resources: [
            {
                name: "NTNU",
                link: "/ntnu"
            },
        ]
    }
    ];
  return (
    <div className="footer">
    <SimpleReactFooter 
    description={description} 
    title={title}
    columns={columns}
    linkedin="fluffy_cat_on_linkedin"
    facebook="fluffy_cat_on_fb"
    twitter="fluffy_cat_on_twitter"
    instagram="fluffy_cat_live"
    youtube="UCFt6TSF464J8K82xeA?"
    pinterest="fluffy_cats_collections"
    copyright="Gruppe 3"
    iconColor="black"
    backgroundColor="#6C757D"
    fontColor="lightgrey"
    copyrightColor="darkgrey"
    align="center"
    />
    </div>
  );
}

export default FooterPage;