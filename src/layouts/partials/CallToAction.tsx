import ContactForm from "@/components/ContactForm";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import config from "@/config/config.json";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  const { contact_form_action } = config.params;
  return (
    <>
      {data.frontmatter.enable && (
        <section className="mb-28">
          <div className="container">
            <div className="rounded-xl bg-theme-light px-3 py-10 dark:bg-darkmode-theme-light xl:p-10">
              <div className="row items-center">
                <div className=" max-w-md    ">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2 "
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6"
                  />
                </div>
                <div className="lg:max-w-xl xl:max-w-3xl shadow bg-white dark:bg-darkmode-theme-dark px-4 py-5 rounded-xl">
                  <ContactForm contactFormAction={contact_form_action} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
