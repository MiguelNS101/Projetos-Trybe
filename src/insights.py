from src.jobs import read


def get_unique_job_types(path):
    """Checks all different job types and returns a list of them

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    list
        List of unique job types
    """
    read_list = read(path)
    job_types = []
    for row in read_list:
        if row["job_type"] not in job_types:
            job_types.append(row["job_type"])
    return job_types


def filter_by_job_type(jobs, job_type):
    """Filters a list of jobs by job_type

    Parameters
    ----------
    jobs : list
        List of jobs to be filtered
    job_type : str
        Job type for the list filter

    Returns
    -------
    list
        List of jobs with provided job_type
    """
    jobs_list = []
    for job in jobs:
        if job["job_type"] == job_type:
            jobs_list.append(job)
    return jobs_list


def get_unique_industries(path):
    """Checks all different industries and returns a list of them

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    list
        List of unique industries
    """
    read_list = read(path)
    industries = []
    for row in read_list:
        if row["industry"] not in industries and row["industry"] != "":
            industries.append(row["industry"])
    return industries


def filter_by_industry(jobs, industry):
    """Filters a list of jobs by industry

    Parameters
    ----------
    jobs : list
        List of jobs to be filtered
    industry : str
        Industry for the list filter

    Returns
    -------
    list
        List of jobs with provided industry
    """
    industry_list = []
    for job in jobs:
        if job["industry"] == industry:
            industry_list.append(job)
    return industry_list


def get_max_salary(path):
    """Get the maximum salary of all jobs

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    int
        The maximum salary paid out of all job opportunities
    """

    data_list = read(path)
    salary_list = []
    for row in data_list:
        if row["max_salary"].isnumeric() and int(row["max_salary"]):
            salary = int(row["max_salary"])
            salary_list.append(salary)
    return max(salary_list)


def get_min_salary(path):
    """Get the minimum salary of all jobs

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    int
        The minimum salary paid out of all job opportunities
    """
    data_list = read(path)
    salary_list = []
    for row in data_list:
        if row["min_salary"].isnumeric() and int(row["min_salary"]):
            salary = int(row["min_salary"])
            salary_list.append(salary)
    return min(salary_list)


def matches_salary_range(job, salary):
    """Checks if a given salary is in the salary range of a given job

    Parameters
    ----------
    job : dict
        The job with `min_salary` and `max_salary` keys
    salary : int
        The salary to check if matches with salary range of the job

    Returns
    -------
    bool
        True if the salary is in the salary range of the job, False otherwise

    Raises
    ------
    ValueError
        If `job["min_salary"]` or `job["max_salary"]` doesn't exists
        If `job["min_salary"]` or `job["max_salary"]` aren't valid integers
        If `job["min_salary"]` is greather than `job["max_salary"]`
        If `salary` isn't a valid integer
    """
    try:
        if (
            "min_salary" not in job
            or "max_salary" not in job
            or int(job["min_salary"]) > int(job["max_salary"])
        ):
            raise ValueError
        else:
            return (
                int(job["min_salary"]) <= int(salary) <= int(job["max_salary"])
            )
    except (TypeError, KeyError):
        raise ValueError()


def filter_by_salary_range(jobs, salary):
    """Filters a list of jobs by salary range

    Parameters
    ----------
    jobs : list
        The jobs to be filtered
    salary : int
        The salary to be used as filter

    Returns
    -------
    list
        Jobs whose salary range contains `salary`
    """
    salary_list = list()
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                salary_list.append(job)
        except ValueError:
            pass

    return salary_list
